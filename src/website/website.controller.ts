import { Controller, Get, Param } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { PagespeedService } from 'src/pagespeed/pagespeed.service';
import { PageSpeedData } from 'src/pagespeed/entities/pagespeeddata.entity';

@Controller('website')
export class WebsiteController {
  constructor(
    private readonly websiteService: WebsiteService,
    private readonly pageSpeedService: PagespeedService,
  ) {}

  @Get(':id/pagespeed')
  async getPageSpeedByWebsiteId(
    @Param('id') id: string,
  ): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  }
}
