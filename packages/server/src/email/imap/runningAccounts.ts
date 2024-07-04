import { Loaded } from '@mikro-orm/core';
import { EmailAccount } from '../entities/email_account.entity';
import { ImapDispatch } from './events/imap.events';
import { ImapService } from './imap.service';
import { ImapWorker } from './imap.worker';

export class RunningAccounts {
  private imapWorkers: Record<string, ImapWorker> = {};
  private failedAccounts: string[] = [];
  private dispatch: ImapDispatch;

  constructor(imapService: ImapService) {
    this.dispatch = async (imapEvent) => {
      imapService.dispatch(imapEvent);
    };
  }

  async createWorker(acc: Loaded<EmailAccount, 'mailbox'>) {
    const worker = new ImapWorker(acc, this.dispatch);
    try {
      await worker.connect();
      this.imapWorkers[acc.id] = worker;
    } catch {
      console.log('failed');
      this.addFaildedAccount(acc.id);
    }
  }

  // TODO deal with failed Accounts
  addFaildedAccount(accountId: string) {
    this.failedAccounts.push(accountId);
  }
}
