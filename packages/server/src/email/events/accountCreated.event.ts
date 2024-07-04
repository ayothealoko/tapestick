import { EmailAccount } from '../entities/email_account.entity';

export class AccountCreated {
  constructor(
    public account: EmailAccount,
    public inboxId: string,
    public inboxPath: string,
    public markedId: string,
    public markedPath: string,
  ) {}
}
