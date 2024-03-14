import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.get('PORT') || 3000);
  Logger.log(`🚀 Application is running on: ${config.get('PORT')}`);
}
bootstrap();
