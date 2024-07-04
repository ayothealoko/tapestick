import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RunningAccounts } from './runningAccounts';
import { ImapEvent } from './events/imap.events';
import { EmailService } from '../email.service';
import {
  EmailAccount,
  entityToConnection,
} from '../entities/email_account.entity';
import { Loaded } from '@mikro-orm/core';
import { OnEvent } from '@nestjs/event-emitter';
import { accountCreatedSub } from '../events/subscription';
import { AccountCreated } from '../events/accountCreated.event';
import { ImapFlow, SearchObject } from 'imapflow';
import { MaildirService } from '../maildir/maildir.service';
import { CreateAccountDto } from '@src/account/dto/create-account.dto';

@Injectable()
export class ImapService implements OnApplicationBootstrap {
  runningAccount!: RunningAccounts;
  constructor(
    private readonly emailService: EmailService,
    private maildirService: MaildirService,
  ) {
    this.runningAccount = new RunningAccounts(this);
  }

  async dispatch(event: ImapEvent) {
    console.log(event);
  }

  async onApplicationBootstrap() {
    const active = await this.emailService.getAllActive();

    const imapPromise = active.map(
      async (a: Loaded<EmailAccount, 'mailbox'>) => {
        await this.runningAccount.createWorker(a);
      },
    );

    await Promise.all(imapPromise);
  }

  @OnEvent(accountCreatedSub)
  async syncNewAccount(event: AccountCreated) {
    const { account, inboxId, markedId, markedPath, inboxPath } = event;
    const currentDate = new Date();
    const lastWeekDate = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
    );

    const connection = entityToConnection(account);

    if (!connection) {
      throw new Error('entity cant make connection');
    }

    const client = new ImapFlow({
      host: connection.host,
      port: connection.port,
      secure: connection.secure,
      logger: false,
      auth: connection.auth,
    });

    await client.connect();

    const [inboxStatus, markedStatus] = await Promise.all([
      client.status('INBOX', {
        uidValidity: true,
        uidNext: true,
        highestModseq: true,
      }),

      client.status(markedPath, {
        uidValidity: true,
        uidNext: true,
        highestModseq: true,
      }),
    ]);

    let inboxUidValidity = undefined;
    if (inboxStatus.uidValidity) {
      inboxUidValidity = inboxStatus.uidValidity.toString();
    }
    let markedUidValidity = undefined;
    if (markedStatus.uidValidity) {
      markedUidValidity = markedStatus.uidValidity.toString();
    }

    try {
      await this.maildirService.makeAccount({
        accountId: account.id,
        markedMailboxId: markedId,
        inboxMailboxId: inboxId,
        inboxUidValidity,
        markedUidValidity,
      });

      await this.syncMailBox({
        client,
        range: { since: lastWeekDate },
        accountId: account.id,
        mailboxId: inboxId,
        mailboxPath: inboxPath,
        isInbox: true,
      });

      await client.getMailboxLock(markedPath);
      await this.syncMailBox({
        client,
        range: { since: lastWeekDate },
        accountId: account.id,
        mailboxId: markedId,
        isInbox: true,
      });
    } catch (err) {
      throw err;
    }
  }

  @OnEvent(accountCreatedSub)
  async syncMailBox({
    client,
    range,
    accountId,
    mailboxId,
    mailboxPath,
    isInbox,
  }: SyncMailBoxProps) {
    const lock = await client.getMailboxLock(mailboxPath);
    try {
      const msgs = client.fetch(range, {
        uid: true,
        source: true,
      });

      for await (let msg of msgs) {
        this.maildirService.addMsg(
          accountId,
          [mailboxId, isInbox],
          msg.uid,
          {},
          msg.source,
        );
      }
    } catch (err) {
      throw err;
    } finally {
      lock.release();
    }
  }
}

export interface SyncMailBoxProps {
  client: ImapFlow;
  range: string | number[] | SearchObject;
  accountId: string;
  mailboxId: string;
  mailboxPath: string;
  isInbox: boolean;
}
