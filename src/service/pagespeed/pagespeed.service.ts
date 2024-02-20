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
import { error } from 'console';

@Injectable()
export class PagespeedService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly websiteService: WebsiteService,
    @InjectRepository(PageSpeedData)
    private readonly pageSpeedEntity: Repository<PageSpeedData>,
  ) {}

  API_KEY = this.configService.get<string>('API_KEY');
  //Request with URL and API Key to Google Lighthouse
  async pageSpeedRequest(url: string): Promise<any> {
    // console.log('CHECK URL:', url);
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
    // console.log('RESPONSE:', encodedUrl);
    const data = await firstValueFrom(response$);
    return data;
  }

  async getPageSpeedResult(
    url: string,
    websiteId: string,
  ): Promise<PageSpeedData> {
    const data = await this.pageSpeedRequest(url);
    // Check if the website exists in the database
    const website = await this.websiteService.getWebsiteById(websiteId);
    if (!website) {
      throw new Error(`Website with WebsiteID ${websiteId} not found`);
    }
    // Create DTO with API results
    const pageSpeedDTO = createPageSpeedDTOFromApiResponse(data);
    // Convert DTO to Entity
    const entity = convertDTOToEntity(pageSpeedDTO, website);
    // Save Entity into Database
    await this.pageSpeedEntity.save(entity);
    // console.log(url, entity);
    return entity;
  }
  async getPageSpeedsByWebsiteId(websiteId: string): Promise<PageSpeedData[]> {
    return await this.pageSpeedEntity.find({
      where: { website: { id: websiteId } },
    });
  }
  async getAllPageSpeeds(webId: string): Promise<PageSpeedData[]> {
    return await this.pageSpeedEntity.find({ where: { id: webId } });
  }
  async getLatestPageSpeedResult(websiteId: string): Promise<PageSpeedData[]> {
    const websites =
      await this.websiteService.getAllWebsitesByCustomerId(websiteId);
    if (!websites || websites.length === 0) {
      throw new Error(`No webseits found for customer with ID ${websiteId}`);
    }
    const latestPageSpeedResults = [];
    for (const website of websites) {
      const pageSpeedResults = await this.pageSpeedEntity.find({
        where: { website: { id: website.id } },
        order: { createdAt: 'DESC' },
        take: 1,
      });
      if (pageSpeedResults.length > 0) {
        latestPageSpeedResults.push(...pageSpeedResults);
      }
    }
    return latestPageSpeedResults;
  }
}
