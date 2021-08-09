import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { urlencoded } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.APP_PORT);
}

bootstrap();
