import { Migration } from '@mikro-orm/migrations';

export class Migration20240421013758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "persons" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint "persons_pkey" primary key ("id"));');
    this.addSql('alter table "persons" add constraint "persons_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "persons" cascade;');
  }

}
