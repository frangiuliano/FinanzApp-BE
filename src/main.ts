import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('finanzapp');

  console.log('Environment Variables:', {
    MONGODB_URI: process.env.MONGODB_URI,
  });

  await app.listen(8080);

  console.log(`Server running on port: ${await app.getUrl()}`);
}
bootstrap();
