import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerSetup } from '@src/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
