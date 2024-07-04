import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerSetup } from '@src/swagger';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston, { format, transports } from 'winston';

async function bootstrap() {
  let transport;
  if (process.env.NODE_ENV !== 'production') {
    transport = [
      new winston.transports.Console({
        format: winston.format.combine(
          nestWinstonModuleUtilities.format.nestLike('MyApp', {
            colors: true,
            prettyPrint: true,
            processId: true,
          }),
        ),
      }),
    ];
  } else {
    transport = [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ];
  }

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.ms(), format.json()),
      defaultMeta: { service: 'user-service' },
      transports: transport,
    }),
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(cookieSecret()));
  swaggerSetup(app);
  await app.listen(8000);
}
bootstrap();

function cookieSecret() {
  const secret = process.env.COOKIE_REFRESH_SECRET;
  if (!secret) {
    throw new Error('ENV:COOKIE_REFRESH_SECRET not set');
  }

  return secret;
}
