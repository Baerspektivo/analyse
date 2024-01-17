import { Module } from '@nestjs/common';
import { PagespeedService } from './pagespeed.service';
import { PagespeedController } from './pagespeed.controller';
import { HttpModule } from '@nestjs/axios';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([PageSpeedData]),
  ],
  controllers: [PagespeedController],
  providers: [PagespeedService],
})
export class PagespeedModule {}
