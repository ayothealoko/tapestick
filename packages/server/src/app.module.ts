import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import config from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config), CommonModule, UserModule, AccountModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
