import { Migration } from '@mikro-orm/migrations';

export class Migration20240704130926 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "mailbox" drop constraint "mailbox_email_account_id_foreign";');

    this.addSql('alter table "mailbox" drop column "email_account_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "mailbox" add column "email_account_id" varchar(255) not null;');
    this.addSql('alter table "mailbox" add constraint "mailbox_email_account_id_foreign" foreign key ("email_account_id") references "email_accounts" ("id") on update cascade;');
  }

}
