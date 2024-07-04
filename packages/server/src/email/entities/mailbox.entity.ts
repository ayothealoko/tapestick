import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@src/common/entities/base.entity';
import { EmailAccount } from './email_account.entity';

@Entity()
export class Mailbox extends CustomBaseEntity {
  @Property()
  path!: string;

  @Property()
  latestUid?: number;

  @Property()
  uidValidity?: string;
}
