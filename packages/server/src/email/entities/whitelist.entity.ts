import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@src/common/entities/base.entity';
import { EmailAccount } from './email_account.entity';

@Entity()
export class WhiteList extends CustomBaseEntity {
  @ManyToOne()
  emailAccount!: EmailAccount;

  @Property()
  item!: string;
}
