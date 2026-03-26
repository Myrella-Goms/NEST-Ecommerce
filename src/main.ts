import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      'Centralized API in operations involving products and shopping carts simulating an e-commerce system',
    )
    .setVersion('1.0')
    .addTag('products', 'shooping carts')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  logger.log('Application running on port: http://localhost:3002');
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
