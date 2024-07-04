import { Migration } from '@mikro-orm/migrations';

export class Migration20240618164812 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "mailbox" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email_account_id" varchar(255) not null, "path" varchar(255) not null, "latest_uid" varchar(255) null, constraint "mailbox_pkey" primary key ("id"));');

    this.addSql('alter table "mailbox" add constraint "mailbox_email_account_id_foreign" foreign key ("email_account_id") references "email_accounts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "mailbox" cascade;');
  }

}
