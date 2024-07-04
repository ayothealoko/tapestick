import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Enum,
  OneToOne,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '@src/common/entities/base.entity';
import { BlackList } from './blacklist.entity';
import { WhiteList } from './whitelist.entity';
import { User } from '@src/user/entities/user.entity';
import { Connection } from '../email.service';
import { Mailbox } from './mailbox.entity';

@Entity({
  tableName: 'email_accounts',
  discriminatorColumn: 'type',
  abstract: true,
})
export abstract class EmailAccount extends CustomBaseEntity {
  @Enum()
  type!: 'password' | 'oauth';

  @ManyToOne()
  user!: User;

  @Property({ unique: true })
  emailAddr!: string;

  @OneToOne()
  markedMailbox!: Mailbox;

  @OneToOne()
  inboxMailbox!: Mailbox;

  @OneToMany({ mappedBy: 'emailAccount' })
  whiteList = new Collection<WhiteList>(this);

  @OneToMany({ mappedBy: 'emailAccount' })
  blackList = new Collection<BlackList>(this);

  @Property()
  canWLContacts!: boolean;

  @Property()
  canBLContacts!: boolean;

  @Property()
  canWLDomain!: boolean;

  @Property()
  canWLRemoved!: boolean;

  @Property()
  host!: string;

  @Property()
  port!: number;

  @Property()
  isSecure!: boolean;
}

@Entity({ discriminatorValue: 'password' })
export class EmailAccPassword extends EmailAccount {
  @Property()
  pass!: string;
}

@Entity({ discriminatorValue: 'oauth' })
export class EmailAccOauth extends EmailAccount {
  @Property()
  accessToken!: string;
  @Property()
  refreshToken!: string;
  @Property()
  refreshLink!: string;
}

function isEmailAccPassword(acc: EmailAccount): acc is EmailAccPassword {
  return acc.type === 'password';
}

function isEmailAccOauth(acc: EmailAccount): acc is EmailAccOauth {
  return acc.type === 'oauth';
}

export function entityToConnection(acc: EmailAccount): Connection | null {
  console.log(acc);
  if (isEmailAccPassword(acc)) {
    return {
      host: acc.host,
      port: acc.port,
      secure: acc.isSecure,
      auth: {
        type: 'password',
        user: acc.emailAddr,
        pass: acc.pass,
      },
    };
  }

  if (isEmailAccOauth(acc)) {
    return {
      host: acc.host,
      port: acc.port,
      secure: acc.isSecure,
      auth: {
        type: 'oauth',
        user: acc.emailAddr,
        accessToken: acc.accessToken,
      },
    };
  }

  return null;
}
