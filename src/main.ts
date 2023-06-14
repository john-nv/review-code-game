import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Game APIs')
    .setDescription('Game APIs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('_docs', app, document);

  const port = process.env.PORT || 8000; // ne khai bao o tren de de doc

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => console.log(`App is starting a port ${port}`));
}
bootstrap();
