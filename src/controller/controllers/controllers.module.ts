import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from 'src/service/customer/customer.service';
import { Customer } from 'src/service/customer/entities/customer.entity';
import { PageSpeedData } from 'src/service/pagespeed/entities/pagespeeddata.entity';
import { PagespeedService } from 'src/service/pagespeed/pagespeed.service';
import { Website } from 'src/service/website/entities/website.entity';
import { WebsiteService } from 'src/service/website/website.service';
import { ControllersController } from './controllers.controller';
import { ControllersService } from './controllers.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Customer, Website, PageSpeedData]),
  ],
  controllers: [ControllersController],
  providers: [
    ControllersService,
    CustomerService,
    WebsiteService,
    PagespeedService,
  ],
  exports: [CustomerService, WebsiteService, PagespeedService, TypeOrmModule],
})
export class ControllersModule {}
