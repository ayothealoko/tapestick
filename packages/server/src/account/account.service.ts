import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { EntityManager } from '@mikro-orm/core';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly em: EntityManager) {}

  create(createAccountDto: CreateAccountDto) {
    let em = this.em.fork();
    const account = new Account();
    account.name = createAccountDto.name;
    em.persist(account).flush();
    return account.id;
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
