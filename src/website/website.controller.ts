import { Controller, Get, Param } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { PagespeedService } from 'src/pagespeed/pagespeed.service';
import { PageSpeedData } from 'src/pagespeed/entities/pagespeeddata.entity';
import { Website } from './entities/website.entity';

@Controller('website')
export class WebsiteController {
  constructor(
    private readonly websiteService: WebsiteService,
    private readonly pageSpeedService: PagespeedService,
  ) {}
  @Get('all')
  async getAllWebsites(): Promise<Website[]> {
    return this.websiteService.getAllWebsites();
  }
  @Get(':id/pagespeed')
  async getPageSpeedByWebsiteId(
    @Param('id') id: string,
  ): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  }
}
