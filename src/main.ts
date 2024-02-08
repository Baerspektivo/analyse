import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PageSpeed API')
    .setDescription('PageSpeed API description')
    .setVersion('1.0')
    .addTag('pagespeed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //activates the transformation from plain JSO.
      whitelist: true, // removes all charataristics from DTO.
      forbidNonWhitelisted: true, //deleting errors that is not wihtelisted.
    }),
  );
  await app.listen(3000);
}
bootstrap();
