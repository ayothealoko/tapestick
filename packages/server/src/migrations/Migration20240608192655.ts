import { Migration } from '@mikro-orm/migrations';

export class Migration20240608192655 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "persons" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "refresh_token" varchar(255) null, constraint "persons_pkey" primary key ("id"));');
    this.addSql('alter table "persons" add constraint "persons_email_unique" unique ("email");');

    this.addSql('create table "email_accounts" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "type" text check ("type" in (\'password\', \'oauth\')) not null, "user_id" varchar(255) not null, "email_addr" varchar(255) not null, "marked_folder" varchar(255) not null, "can_wlcontacts" boolean not null, "can_blcontacts" boolean not null, "can_wldomain" boolean not null, "can_wlremoved" boolean not null, "host" varchar(255) not null, "port" int not null, "is_secure" boolean not null, "pass" varchar(255) null, "access_token" varchar(255) null, "refresh_token" varchar(255) null, "refresh_link" varchar(255) null, constraint "email_accounts_pkey" primary key ("id"));');
    this.addSql('create index "email_accounts_type_index" on "email_accounts" ("type");');
    this.addSql('alter table "email_accounts" add constraint "email_accounts_email_addr_unique" unique ("email_addr");');

    this.addSql('create table "black_list" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email_account_id" varchar(255) not null, "item" varchar(255) not null, constraint "black_list_pkey" primary key ("id"));');

    this.addSql('create table "white_list" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email_account_id" varchar(255) not null, "item" varchar(255) not null, constraint "white_list_pkey" primary key ("id"));');

    this.addSql('alter table "email_accounts" add constraint "email_accounts_user_id_foreign" foreign key ("user_id") references "persons" ("id") on update cascade;');

    this.addSql('alter table "black_list" add constraint "black_list_email_account_id_foreign" foreign key ("email_account_id") references "email_accounts" ("id") on update cascade;');

    this.addSql('alter table "white_list" add constraint "white_list_email_account_id_foreign" foreign key ("email_account_id") references "email_accounts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "email_accounts" drop constraint "email_accounts_user_id_foreign";');

    this.addSql('alter table "black_list" drop constraint "black_list_email_account_id_foreign";');

    this.addSql('alter table "white_list" drop constraint "white_list_email_account_id_foreign";');

    this.addSql('drop table if exists "persons" cascade;');

    this.addSql('drop table if exists "email_accounts" cascade;');

    this.addSql('drop table if exists "black_list" cascade;');

    this.addSql('drop table if exists "white_list" cascade;');
  }

}
