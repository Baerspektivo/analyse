import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagespeedService } from 'src/pagespeed/pagespeed.service';
import { WebsiteService } from 'src/website/website.service';
import { PageSpeedData } from '../pagespeed/entities/pagespeeddata.entity';
import { Website } from '../website/entities/website.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Customer, Website, PageSpeedData]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, WebsiteService, PagespeedService],
  exports: [CustomerService, WebsiteService, PagespeedService, TypeOrmModule],
})
export class CustomerModule {}
