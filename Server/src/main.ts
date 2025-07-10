import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      transform: true, // Transform payloads to be objects typed according to their DTO classes
      forbidNonWhitelisted: true, // Throw errors when non-whitelisted properties are present
    }),
  );

  // Enable CORS
  app.enableCors();

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
