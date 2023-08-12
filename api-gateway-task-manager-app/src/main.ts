import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GlobalErrors } from '@shared/errors/global-errors';
import { env } from 'env';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalErrors());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(env.APP_PORT, () =>
    console.log('Api gateway is listenning ' + env.APP_PORT),
  );
}
bootstrap();
