import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './service/customer/customer.controller';
import { CustomerModule } from './service/customer/customer.module';
import { CustomerService } from './service/customer/customer.service';
import { Customer } from './service/customer/entities/customer.entity';
import { PageSpeedData } from './service/pagespeed/entities/pagespeeddata.entity';
import { PagespeedModule } from './service/pagespeed/pagespeed.module';
import { PagespeedService } from './service/pagespeed/pagespeed.service';
import { Website } from './service/website/entities/website.entity';
import { WebsiteController } from './service/website/website.controller';
import { WebsiteService } from './service/website/website.service';
import { ControllersController } from './controller/controllers/controllers.controller';
import { ControllersService } from './controller/controllers/controllers.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentResultInterceptor } from './interceptor/currentresult.interceptor';

@Module({
  imports: [
    HttpModule,
    PagespeedModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: false,
          envFilePath: '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST'),
        port: parseInt(configService.get<string>('PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [PageSpeedData, Customer, Website],
        synchronize: true,
        logging: false,
      }),
    }),
    CustomerModule,
  ],
  controllers: [CustomerController, WebsiteController, ControllersController],
  providers: [
    CustomerService,
    WebsiteService,
    PagespeedService,
    ControllersService,
    ConfigService,
    // { provide: APP_INTERCEPTOR, useClass: CurrentResultInterceptor },
  ],
})
export class AppModule {}
