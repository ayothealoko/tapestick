import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { User } from '@src/user/entities/user.entity';
import {
  CreateRequestContext,
  EntityManager,
  Populate,
  wrap,
} from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  @CreateRequestContext()
  async create(createUserDto: CreateUserDto) {
    const em = this.em;
    const user = new User(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
      createUserDto.password,
    );

    try {
      await em.persist(user).flush();
      return user.id;
    } catch (err) {
      throw new BadRequestException('Could not create', { cause: err });
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  @CreateRequestContext()
  async findById<T extends string[], K extends T[number]>(
    id: string,
    populate?: Populate<User, K>,
  ) {
    const em = this.em;

    try {
      const user = em.findOneOrFail(User, { id }, { populate });
      return user;
    } catch (err) {
      throw new BadRequestException('Not Found', { cause: err });
    }
  }

  @CreateRequestContext()
  async findByEmail<T extends string[], K extends T[number]>(
    email: string,
    populate?: Populate<User, K>,
  ) {
    const em = this.em;

    try {
      const user = em.findOneOrFail(User, { email }, { populate });
      return user;
    } catch (err) {
      throw new BadRequestException('Not Found', { cause: err });
    }
  }

  @CreateRequestContext()
  async update(id: string, updateUserDto: UpdateUserDto) {
    const em = this.em;

    const user = await this.findById(id);
    wrap(user).assign({
      ...updateUserDto,
    });

    await em.persist(user).flush();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
