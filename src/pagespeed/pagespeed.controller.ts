import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { PagespeedService } from './pagespeed.service';

@Controller('pagespeed')
export class PagespeedController {
  constructor(private readonly pageSpeedService: PagespeedService) {}

  @Post()
  async getPageSpeedResult(@Body() body: any): Promise<any> {
    try {
      let url = body.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      const encodedUrl = encodeURI(body.url);
      const expression = new RegExp(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
      );
      if (!body.url || body.url === '' || body.url.match(expression) === null) {
        throw new HttpException('Bad Request', 400);
      }
      return await this.pageSpeedService.getPageSpeedResult(encodedUrl);
    } catch (error) {
      console.log('Error', error);
      throw new HttpException('Invalid URL parameter', 400);
    }
  }
}
