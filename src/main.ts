import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CreateWebsiteDto } from './service/website/dto/create-website.dto';
import { CreateCustomerDto } from './service/customer/dto/create-customer.dto';
import { CreatePageSpeedDto } from './service/pagespeed/dto/create-pagespeed.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PageSpeed API')
    .setDescription('PageSpeed API description')
    .setVersion('1.0')
    .addTag('pagespeed')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CreateWebsiteDto, CreateCustomerDto, CreatePageSpeedDto],
  });
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //activates the transformation from plain JSO.
      whitelist: true, // removes all charataristics from DTO.
      forbidNonWhitelisted: true, //deleting errors that is not wihtelisted.
    }),
  );
  //#region acception corse
  app.enableCors();
  //#endregion
  await app.listen(3001);
}
bootstrap();
