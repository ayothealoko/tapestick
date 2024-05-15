import * as argon2 from 'argon2';
import { BeforeCreate, Entity, EventArgs, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@src/common/entities/base.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Entity({ tableName: 'persons' })
export class User extends CustomBaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true, lazy: true })
  password: string;

  @Property({ hidden: true, lazy: true, nullable: true })
  refreshToken: string | null;

  @Property({ persist: false, nullable: true })
  checkToken: string | null;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    refreshToken: string | null = null,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.refreshToken = refreshToken;
    this.checkToken = null;
  }

  @BeforeCreate()
  async hashPassword(args: EventArgs<User>): Promise<void> {
    try {
      const password = args.changeSet?.payload.password;
      if (password) {
        this.password = await argon2.hash(this.password);
      }
    } catch (err) {
      throw new InternalServerErrorException('Could not do it', {
        cause: err,
      });
    }
  }

  async verify(password: string) {
    const verify = argon2.verify(this.password, password);
    return verify;
  }
}
