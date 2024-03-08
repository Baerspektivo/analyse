import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { WebsiteService } from '../website/website.service';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import {
  convertDTOToEntity,
  createPageSpeedDTOFromApiResponse,
} from './pagespeed.utils';

@Injectable()
export class PagespeedService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly websiteService: WebsiteService,
    @InjectRepository(PageSpeedData)
    private readonly pageSpeedRepository: Repository<PageSpeedData>,
  ) {}

  API_KEY = this.configService.get<string>('API_KEY');
  //#region  Request with URL and API Key to Google Lighthouse to get PageSpeedResults
  // It's essential to note that the Google API only accepts URLs with a protocol (such as "http://" or "https://").
  // If a domain is registered only with a subdomain, you can only test it with the subdomain included.
  // Without a subdomain, it will result in a 500 Error.
  async pageSpeedRequest(url: string): Promise<any> {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = 'https://' + url;
    }
    const expression = new RegExp(
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
    );
    if (!url || url === '' || url.match(expression) === null) {
      throw new HttpException(
        "Bad Request: The URL must begin with 'http://' or 'https://' and have a valid domain format.",
        400,
      );
    }
    const encodedUrl = encodeURI(url);
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${this.API_KEY}`;
    const response$ = this.httpService
      .get(apiUrl)
      .pipe(map((response) => response.data));
    const data = await firstValueFrom(response$);
    return data;
  }
  //#endregion

  async getPageSpeedResult(
    url: string,
    websiteId: string,
  ): Promise<PageSpeedData> {
    const data = await this.pageSpeedRequest(url);
    const website = await this.websiteService.getWebsiteById(websiteId);
    if (!website) {
      throw new Error(`Website with WebsiteID ${websiteId} not found`);
    }
    // Create DTO with API results
    const pageSpeedDTO = createPageSpeedDTOFromApiResponse(data);
    // Convert DTO to Entity
    const entity = convertDTOToEntity(pageSpeedDTO, website);
    // Save Entity into Database
    await this.pageSpeedRepository.save(entity);
    return entity;
  }
  async getPageSpeedsByWebsiteId(websiteId: string): Promise<PageSpeedData[]> {
    return await this.pageSpeedRepository.find({
      where: { website: { id: websiteId } },
    });
  }
  async getAllPageSpeeds(webId: string): Promise<PageSpeedData[]> {
    return await this.pageSpeedRepository.find({ where: { id: webId } });
  }
}
