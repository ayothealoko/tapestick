import { EventEmitterModule } from '@nestjs/event-emitter';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { OpenapiModule } from './openapi/openapi.module';
import config from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MikroOrmModule.forRoot(config),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    CommonModule,
    UserModule,
    AccountModule,
    AuthModule,
    EmailModule,
    OpenapiModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
