import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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

  const port = process.env.PORT || 8000;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => console.log(`App is starting a port ${port}`));
}
bootstrap();
