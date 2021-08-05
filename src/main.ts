import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rootDir = join(__dirname, '..');
  app.use('/public', express.static(join(rootDir, 'public')));

  await app.listen(3001);
}
bootstrap();
