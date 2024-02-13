import { Body, Param, Controller, Post } from '@nestjs/common';
import { PagespeedService } from '../pagespeed/pagespeed.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { Website } from './entities/website.entity';
import { WebsiteService } from './website.service';

@Controller('website')
export class WebsiteController {
  // constructor(
  //   private readonly websiteService: WebsiteService,
  //   private readonly pageSpeedService: PagespeedService,
  // ) {}
  // @Post()
  // async createWebsite(
  //   @Body() createWebsiteDto: CreateWebsiteDto,
  // ): Promise<Website> {
  //   return this.websiteService.createOrUpdateWebsite(createWebsiteDto);
  // }
  //
  // @Post(':id')
  // async updateWebsite(
  //   @Param('id') websiteId: Website['id'],
  //   @Body() updateWebsiteDto: UpdateWebsiteDto,
  // ) {
  //   return this.websiteService.createOrUpdateWebsite();
  // }
  // @Get('all')
  // async getAllWebsites(): Promise<Website[]> {
  //   return this.websiteService.getAllWebsites();
  // }
  // @Get(':id/pagespeed')
  // async getPageSpeedByWebsiteId(
  //   @Param('id') id: string,
  // ): Promise<PageSpeedData[]> {
  //   return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  // }
}
