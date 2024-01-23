import { Module } from '@nestjs/common';
import { PagespeedService } from './pagespeed.service';
import { PagespeedController } from './pagespeed.controller';
import { HttpModule } from '@nestjs/axios';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Customer } from '../customer/entities/customer.entity';
import { Website } from '../customer/entities/website.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([PageSpeedData, Customer, Website]),
  ],
  controllers: [PagespeedController],
  providers: [PagespeedService],
})
export class PagespeedModule {}
