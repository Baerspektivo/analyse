import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { PageSpeedData } from '../pagespeed/entities/pagespeeddata.entity';
import { Website } from './entities/website.entity';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { CustomerModule } from 'src/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { PagespeedModule } from 'src/pagespeed/pagespeed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Website, PageSpeedData]),
    forwardRef(() => PagespeedModule),
    CustomerModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService, TypeOrmModule],
})
export class WebsiteModule {}
