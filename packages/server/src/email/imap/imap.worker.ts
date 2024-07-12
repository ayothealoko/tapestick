import {
  EmailAccount,
  entityToConnection,
} from '@src/email/entities/email_account.entity';
import { Connection } from '@src/email/email.service';
import { ImapFlow, MailboxLockObject } from 'imapflow';
import { EventEnum, ExistsEvent, ImapDispatch } from './events/imap.events';
import { Mailbox } from '../entities/mailbox.entity';

export class ImapWorker {
  connection: Connection;
  dispatch: ImapDispatch;
  account: EmailAccount;
  boxStore: Record<string, [ImapFlow, MailboxLockObject]> = {};

  constructor(account: EmailAccount, dispatch: ImapDispatch) {
    const connection = entityToConnection(account);
    if (connection === null) {
      throw new Error('Connection invalid for emailaccount: ' + account.id);
    }

    this.connection = connection;
    this.account = account;
    this.dispatch = dispatch;
  }

  async connect() {
    this.setupMailbox(this.account.inboxMailbox);
    this.setupMailbox(this.account.markedMailbox);
  }

  async setupMailbox(mailbox: Mailbox) {
    const client = new ImapFlow(this.connection);
    await client.connect();

    client.on('exists', async ({ count, prevCount, path }) => {
      const existsEvent: ExistsEvent = {
        type: EventEnum.EXISTS,
        accountId: this.account.id,
        path: path,
        count,
        prevCount,
      };

      console.log('log', existsEvent);
      await this.dispatch(existsEvent);
    });

    const lock = await client.getMailboxLock(mailbox.path);
    this.boxStore[mailbox.path] = [client, lock];
  }
}
