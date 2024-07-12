import {
  EntityManager,
  CreateRequestContext,
  Loaded,
  LoadedCollection,
  wrap,
} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ImapFlow, ListResponse } from 'imapflow';
import { v4 } from 'uuid';

import {
  CreateOauthEmailAccDto,
  CreatePassEmailAccDto,
} from '@src/email/dto/create-email-account.dto';
import {
  EmailAccOauth,
  EmailAccPassword,
  EmailAccount,
} from './entities/email_account.entity';
import { WhiteList } from './entities/whitelist.entity';
import { BlackList } from './entities/blacklist.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountCreated } from './events/accountCreated.event';
import { Mailbox } from './entities/mailbox.entity';
import { accountCreatedSub } from './events/subscription';

@Injectable()
export class EmailService {
  constructor(
    private readonly em: EntityManager,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @CreateRequestContext()
  async createPass(
    userId: string,
    delimiter: string,
    data: CreatePassEmailAccDto,
  ) {
    try {
      const em = this.em;
      const { markedMailboxPath, ...rest } = data;

      // add mailboxes
      const inbox = em.create(Mailbox, {
        path: 'INBOX',
      });

      const marked = em.create(Mailbox, {
        path: `INBOX${delimiter}${markedMailboxPath}`,
      });

      const emailAccount = em.create(EmailAccPassword, {
        user: userId,
        markedMailbox: marked.id,
        inboxMailbox: inbox.id,
        ...rest,
      });

      // create white list
      data.whiteList.forEach((item) => {
        em.create(WhiteList, {
          emailAccount: emailAccount.id,
          item,
        });
      });

      // create black list
      data.blackList.forEach((item) => {
        em.create(BlackList, {
          emailAccount: emailAccount.id,
          item,
        });
      });

      await em.flush();

      this.eventEmitter.emit(
        accountCreatedSub,
        new AccountCreated(
          emailAccount,
          inbox.id,
          inbox.path,
          marked.id,
          marked.path,
        ),
      );
    } catch (err) {
      throw err;
    }
  }

  @CreateRequestContext()
  async createOauth(
    userId: string,
    delimiter: string,
    data: CreateOauthEmailAccDto,
  ) {
    try {
      const em = this.em;
      const { markedMailboxPath, ...rest } = data;

      // add mailboxes
      const inbox = em.create(Mailbox, {
        path: 'INBOX',
      });

      const marked = em.create(Mailbox, {
        path: `INBOX${delimiter}${markedMailboxPath}`,
      });

      const emailAccount = em.create(EmailAccOauth, {
        user: userId,
        markedMailbox: marked.id,
        inboxMailbox: inbox.id,
        ...rest,
      });

      // create white list
      data.whiteList.forEach((item) => {
        em.create(WhiteList, {
          emailAccount: emailAccount.id,
          item,
        });
      });

      // create black list
      data.blackList.forEach((item) => {
        em.create(BlackList, {
          emailAccount: emailAccount.id,
          item,
        });
      });

      await em.flush();

      this.eventEmitter.emit(
        accountCreatedSub,
        new AccountCreated(
          emailAccount,
          inbox.id,
          inbox.path,
          marked.id,
          marked.path,
        ),
      );
    } catch (err) {
      throw err;
    }
  }

  async listMailboxes(connection: Connection): Promise<ListResponse[]> {
    const client = new ImapFlow({
      host: connection.host,
      port: connection.port,
      secure: connection.secure,
      logger: false,
      auth: connection.auth,
    });

    let list;

    try {
      await client.connect();

      list = await client.list();
    } catch (e) {
      throw e;
    } finally {
      await client.logout();
    }
    return list;
  }

  async tryLogin(connection: Connection): Promise<boolean> {
    try {
      const client = new ImapFlow({
        host: connection.host,
        port: connection.port,
        secure: connection.secure,
        logger: false,
        auth: connection.auth,
      });

      await client.connect();
      await client.logout();
      return true;
    } catch (e) {
      return false;
    }
  }

  @CreateRequestContext()
  async getAllActive(): Promise<
    Loaded<EmailAccount, 'markedMailbox' | 'inboxMailbox'>[]
  > {
    try {
      const em = this.em;
      const emailAcc = await em.findAll(EmailAccount, {
        populate: ['markedMailbox', 'inboxMailbox'],
      });
      return emailAcc;
    } catch (err) {
      throw err;
    }
  }

  @CreateRequestContext()
  async getAccountById(accoundId: string): Promise<Loaded<EmailAccount>> {
    try {
      const em = this.em;
      const emailAcc = await em.findOneOrFail(EmailAccount, { id: accoundId });
      return emailAcc;
    } catch (err) {
      throw err;
    }
  }

  @CreateRequestContext()
  async getMailBoxById(mailboxId: string): Promise<Loaded<Mailbox>> {
    try {
      const em = this.em;
      const mailbox = await em.findOneOrFail(Mailbox, { id: mailboxId });
      return mailbox;
    } catch (err) {
      throw err;
    }
  }

  @CreateRequestContext()
  async updateMailboxUid(mailboxId: string, uid: number) {
    try {
      const em = this.em;
      const mailbox = await em.findOneOrFail(Mailbox, { id: mailboxId });
      if (mailbox.latestUid !== undefined && mailbox.latestUid > uid) {
        return;
      }

      wrap(mailbox).assign({
        latestUid: uid,
      });
    } catch (err) {
      throw err;
    }
  }

  @CreateRequestContext()
  async updateMailbox(mailboxId: string, data: Partial<Omit<Mailbox, 'id'>>) {
    try {
      const em = this.em;
      const mailbox = await em.findOneOrFail(Mailbox, { id: mailboxId });
      const { latestUid, ...rest } = data;

      wrap(mailbox).assign({
        ...rest,
      });

      if (latestUid) {
        await this.updateMailboxUid(mailboxId, latestUid);
      }
    } catch (err) {
      throw err;
    }
  }
}

export interface Connection {
  host: string;
  port: number;
  secure: boolean;
  logger: false | undefined;
  auth:
    | { type: 'password'; user: string; pass: string }
    | { type: 'oauth'; user: string; accessToken: string };
}
