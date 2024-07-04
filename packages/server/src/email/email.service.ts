import {
  EntityManager,
  CreateRequestContext,
  Loaded,
  LoadedCollection,
  wrap,
} from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ImapFlow } from 'imapflow';
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
import { UserService } from '@src/user/user.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly em: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
  ) {}

  @CreateRequestContext()
  async createPass(userId: string, data: CreatePassEmailAccDto) {
    try {
      const em = this.em;
      const user = await this.userService.findById(userId);

      const inbox = new Mailbox();
      const marked = new Mailbox();
      const emailAccount = new EmailAccPassword();
      em.persist([emailAccount, inbox, marked]);

      inbox.path = 'INBOX';

      marked.path = data.markedMailboxPath;
      emailAccount.type = data.type;
      emailAccount.user = user;
      emailAccount.markedMailbox = marked;
      emailAccount.inboxMailbox = inbox;
      emailAccount.emailAddr = data.emailAddr;
      emailAccount.canWLContacts = data.canWLContacts;
      emailAccount.canBLContacts = data.canBLContacts;
      emailAccount.canWLDomain = data.canWLDomain;
      emailAccount.canWLRemoved = data.canWLRemoved;
      emailAccount.host = data.host;
      emailAccount.port = data.port;
      emailAccount.isSecure = data.isSecure;
      emailAccount.pass = data.pass;

      await em.flush();

      data.whiteList.forEach((item) => {
        const wl = new WhiteList();
        wl.item = item;
        emailAccount.blackList.add(wl);
      });

      data.blackList.forEach((item) => {
        const bl = new BlackList();
        bl.item = item;
        emailAccount.blackList.add(bl);
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
    createOauthEmailAccDto: CreateOauthEmailAccDto,
  ) {
    try {
      const em = this.em;
      const emailAccountId = v4();
      const { markedMailboxPath, ...rest } = createOauthEmailAccDto;

      // add mailboxes
      const inboxId = v4();
      em.create(Mailbox, {
        id: inboxId,
        path: 'INBOX',
      });

      const markedId = v4();
      em.create(Mailbox, {
        id: markedId,
        path: markedMailboxPath,
      });

      const emailAccount = em.create(EmailAccOauth, {
        id: emailAccountId,
        user: userId,
        markedMailbox: markedId,
        inboxMailbox: inboxId,
        ...rest,
      });

      // create white list
      createOauthEmailAccDto.whiteList.forEach((item) => {
        em.create(WhiteList, {
          emailAccount: emailAccountId,
          item,
        });
      });

      // create black list
      createOauthEmailAccDto.blackList.forEach((item) => {
        em.create(BlackList, {
          emailAccount: emailAccountId,
          item,
        });
      });

      await em.flush();

      this.eventEmitter.emit(
        accountCreatedSub,
        new AccountCreated(
          emailAccount,
          inboxId,
          'INBOX',
          markedId,
          markedMailboxPath,
        ),
      );
    } catch (err) {
      throw err;
    }
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
      //await client.logout();
      return true;
    } catch (e) {
      console.log(e);
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
      if (mailbox.latestUid == undefined || mailbox.latestUid > uid) {
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
  auth:
    | { type: 'password'; user: string; pass: string }
    | { type: 'oauth'; user: string; accessToken: string };
}
