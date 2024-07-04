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
  connStore: Record<string, [MailboxLockObject, ImapFlow]>;

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
    const { inboxMailbox, markedMailbox } = this.account;
    await Promise.all([
      this.addMailBox(inboxMailbox),
      this.addMailBox(markedMailbox),
    ]);
    return;
  }

  async addMailBox(mailbox: Mailbox) {
    const box = new ImapFlow(this.connection);

    const boxLock = await box.getMailboxLock(mailbox.path);

    this.connStore[mailbox.id] = [boxLock, box];

    box.on('exists', async ({ count, prevCount }) => {
      const existsEvent: ExistsEvent = {
        type: EventEnum.EXISTS,
        accountId: this.account.id,
        path: mailbox.path,
        count,
        prevCount,
      };

      await this.dispatch(existsEvent);
    });
  }
}
