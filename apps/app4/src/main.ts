import { NestFactory } from '@nestjs/core';
import { App4Module } from './app4.module';

async function bootstrap() {
  const app = await NestFactory.create(App4Module);
  await app.listen(3004);
}
bootstrap();
