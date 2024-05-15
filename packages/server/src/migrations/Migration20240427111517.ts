import { Migration } from '@mikro-orm/migrations';

export class Migration20240427111517 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "persons" add column "refresh_token" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "persons" drop column "refresh_token";');
  }

}
