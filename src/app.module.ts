import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { Customer } from './customer/entities/customer.entity';
import { PageSpeedData } from './pagespeed/entities/pagespeeddata.entity';
import { PagespeedModule } from './pagespeed/pagespeed.module';
import { PagespeedService } from './pagespeed/pagespeed.service';
import { Website } from './website/entities/website.entity';
import { WebsiteController } from './website/website.controller';
import { WebsiteService } from './website/website.service';

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
        logging: true,
      }),
    }),
    CustomerModule,
  ],
  controllers: [CustomerController, WebsiteController],
  providers: [CustomerService, WebsiteService, PagespeedService, ConfigService],
})
export class AppModule {}
