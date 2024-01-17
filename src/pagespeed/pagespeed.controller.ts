import { Controller, Get, Param } from '@nestjs/common';
import { PagespeedService } from './pagespeed.service';

@Controller('pagespeed')
export class PagespeedController {
  constructor(private readonly pageSpeedService: PagespeedService) {}

  @Get(':url')
  async getPageSpeedResult(@Param('url') url: string): Promise<any> {
    const encodedUrl = 'http://' + encodeURI(url);
    const result = this.pageSpeedService.pageSpeedRequest(encodedUrl);
    return result;
  }
}
