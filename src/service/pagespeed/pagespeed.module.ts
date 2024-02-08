import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { PagespeedController } from './pagespeed.controller';
import { PagespeedService } from './pagespeed.service';
import { WebsiteModule } from '../website/website.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    WebsiteModule,
    TypeOrmModule.forFeature([PageSpeedData]),
  ],
  controllers: [PagespeedController],
  providers: [PagespeedService],
  exports: [PagespeedService],
})
export class PagespeedModule {}
