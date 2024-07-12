import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { FolderPos, existsElse, makeDir } from './helpers';
import { Flags, getDataFromMsg, messageTemplate } from './templates';
import { glob } from 'glob';
import { EmailService } from '../email.service';

@Injectable()
export class MaildirService {
  mailDirRoot: string;
  constructor(private readonly emailService: EmailService) {
    const MAIL_DIR_ROOT = process.env.MAIL_DIR_ROOT;

    if (!MAIL_DIR_ROOT) {
      throw new Error('SET MAILDIR ENV');
    }

    let exists = false;
    try {
      // throws if not exists
      const stat = fsSync.statSync(MAIL_DIR_ROOT);
      exists = true;
      if (stat.isFile()) {
        throw new Error('MAILDIR ROOT SHOULD BE A FOLDER NOT FILE');
      }
      this.mailDirRoot = MAIL_DIR_ROOT;
    } catch (err) {
      if (exists) {
        throw err;
      }

      fsSync.mkdirSync(MAIL_DIR_ROOT);
      this.mailDirRoot = MAIL_DIR_ROOT;
    }
  }

  private async makeMailDir(dir: string, isSubFolder: boolean) {
    try {
      await Promise.all([
        makeDir(path.resolve(this.mailDirRoot, dir, 'cur'), true),
        makeDir(path.resolve(this.mailDirRoot, dir, 'new'), true),
        makeDir(path.resolve(this.mailDirRoot, dir, 'tmp'), true),
      ]);

      if (isSubFolder) {
        const f = await fs.open(
          path.resolve(this.mailDirRoot, dir, 'maildirfolder'),
          'a',
        );
        await f.close();
      }
    } catch (err) {
      throw err;
    }
  }

  async makeAccount({
    accountId,
    markedMailboxId,
    inboxMailboxId,
    inboxUidValidity,
    markedUidValidity,
  }: MakeAccountProps) {
    try {
      await Promise.all([
        this.makeMailDir(accountId, false),
        this.emailService.updateMailbox(inboxMailboxId, {
          uidValidity: inboxUidValidity,
        }),
        this.makeMailDir(`${accountId}/.${markedMailboxId}`, true),
        this.emailService.updateMailbox(markedMailboxId, {
          uidValidity: markedUidValidity,
        }),
      ]);
    } catch (err) {
      throw err;
    }
  }

  async addMsg(
    accountId: string,
    // true = inbox
    mailboxId: [string, boolean],
    uid: number,
    flags: Omit<Flags, 'S' | 'O'>,
    message: Buffer | string,
  ) {
    let dir = '';
    if (!mailboxId[1]) {
      dir = `.${mailboxId[0]}`;
    }

    let S;
    if (typeof message === 'string') {
      S = Buffer.byteLength(message, 'utf8');
    } else {
      S = Buffer.byteLength(message);
    }

    const O = 0;
    const epoch = Date.now();

    const uuid = v4();
    const name = messageTemplate({ epoch, uuid, flags: { S, O, ...flags } });
    const fileName = path.resolve(
      this.mailDirRoot,
      accountId,
      dir,
      'tmp',
      name,
    );

    try {
      await Promise.all([
        existsElse(fileName, 'file', async (url: string) => {
          await fs.writeFile(url, message);
        }),
        this.emailService.updateMailboxUid(mailboxId[0], uid),
      ]);
    } catch (err) {
      throw err;
    }
  }

  // moves within a mailbox
  async moveMessage(
    accountId: string,
    uuid: string,
    mailboxId: string | null,
    folderPos: FolderPos,
    dest: FolderPos,
    flags?: Partial<Omit<Flags, 'S'>>,
  ) {
    let dir = '';
    if (mailboxId !== null) {
      dir = `.${mailboxId}`;
    }
    const dirName = path.resolve(this.mailDirRoot, accountId, dir, folderPos);
    const fileGlob = `${dirName}/${uuid},S=*`;
    try {
      const matches = await glob(fileGlob);
      if (matches.length !== 1) {
        throw new Error(
          `too many files match
           file: ${fileGlob},
           matches: ${matches.length}`,
        );
      }

      const srcName = matches[0];
      const parsedMessage = getDataFromMsg(srcName);
      if (parsedMessage === null) {
        throw new Error(`file name wrongly formated : ${srcName}`);
      }

      const mergedFlags = { ...parsedMessage.flags, ...flags };
      const destName = path.resolve(
        this.mailDirRoot,
        accountId,
        dir,
        dest,
        messageTemplate({
          uuid,
          epoch: parsedMessage.epoch,
          flags: mergedFlags,
        }),
      );
      await fs.rename(srcName, destName);
    } catch (err) {
      throw err;
    }
  }
}

export interface MakeAccountProps {
  accountId: string;
  inboxMailboxId: string;
  markedMailboxId: string;
  inboxUidValidity?: string;
  markedUidValidity?: string;
}
