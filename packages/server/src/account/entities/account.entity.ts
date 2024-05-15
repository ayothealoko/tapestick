import { Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@src/common/entities/base.entity';

export class Account extends CustomBaseEntity {
  @Property()
  name!: string;
}
