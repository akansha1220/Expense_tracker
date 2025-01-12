/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (adjust for production)
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with specific origin(s) in production
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false, // Set to true if cookies or credentials are required
  });

  // Use Global Validation Pipe with enhanced options
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true, // Strips out unknown properties
      forbidNonWhitelisted: true, // Throws an error for unknown properties
    }),
  );

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable API Versioning (currently not versioned)
  app.enableVersioning({
    type: VersioningType.URI, // /v1/resource
  });

  // Start the server on the specified port or fallback to 3000
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Server is running on http://localhost:${PORT}/api`);
}

bootstrap();

