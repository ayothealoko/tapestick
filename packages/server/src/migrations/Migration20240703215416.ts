import { Migration } from '@mikro-orm/migrations';

export class Migration20240703215416 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "email_accounts" drop column "marked_folder";');

    this.addSql('alter table "email_accounts" add column "marked_mailbox_id" varchar(255) not null, add column "inbox_mailbox_id" varchar(255) not null;');
    this.addSql('alter table "email_accounts" add constraint "email_accounts_marked_mailbox_id_foreign" foreign key ("marked_mailbox_id") references "mailbox" ("id") on update cascade;');
    this.addSql('alter table "email_accounts" add constraint "email_accounts_inbox_mailbox_id_foreign" foreign key ("inbox_mailbox_id") references "mailbox" ("id") on update cascade;');
    this.addSql('alter table "email_accounts" add constraint "email_accounts_marked_mailbox_id_unique" unique ("marked_mailbox_id");');
    this.addSql('alter table "email_accounts" add constraint "email_accounts_inbox_mailbox_id_unique" unique ("inbox_mailbox_id");');

    this.addSql('alter table "mailbox" add column "uid_validity" varchar(255) null;');
    this.addSql('alter table "mailbox" alter column "latest_uid" type int using ("latest_uid"::int);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "email_accounts" drop constraint "email_accounts_marked_mailbox_id_foreign";');
    this.addSql('alter table "email_accounts" drop constraint "email_accounts_inbox_mailbox_id_foreign";');

    this.addSql('alter table "email_accounts" drop constraint "email_accounts_marked_mailbox_id_unique";');
    this.addSql('alter table "email_accounts" drop constraint "email_accounts_inbox_mailbox_id_unique";');
    this.addSql('alter table "email_accounts" drop column "marked_mailbox_id", drop column "inbox_mailbox_id";');

    this.addSql('alter table "email_accounts" add column "marked_folder" varchar(255) not null;');

    this.addSql('alter table "mailbox" drop column "uid_validity";');

    this.addSql('alter table "mailbox" alter column "latest_uid" type varchar(255) using ("latest_uid"::varchar(255));');
  }

}
