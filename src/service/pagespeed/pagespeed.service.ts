import { HttpService } from '@nestjs/axios';
import { convertDTOToEntity } from './pagespeed.utils';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { WebsiteService } from '../website/website.service';
import { CreatePageSpeedDto } from './dto/create-pagespeed.dto';

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
    console.log('CHECK URL:', url);
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = 'https://' + url;
    }
    const expression = new RegExp(
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
    );
    if (!url || url === '' || url.match(expression) === null) {
      throw new HttpException('Bad Request', 400);
    }
    const encodedUrl = encodeURI(url);
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${this.API_KEY}`;
    const response$ = this.httpService
      .get(apiUrl)
      .pipe(map((response) => response.data));
    console.log('RESPONSE:', encodedUrl);
    const data = await firstValueFrom(response$);
    return data;
  }

  async getPageSpeedResult(url: string, websiteId: string): Promise<void> {
    const data = await this.pageSpeedRequest(url);

    // Create new PageSpeedData entity
    const pageSpeedDTO = new CreatePageSpeedDto();

    const website = await this.websiteService.getWebsiteById(websiteId);
    if (!website) {
      throw new Error(`Website with WebsiteID ${websiteId} not found`);
    }

    // Datas from pagespeed request
    const mainLighthouseObjet = data.lighthouseResult;
    const firstContentfulPaintData =
      data.lighthouseResult.audits['first-contentful-paint'];
    const firstMeaningfulPaintData =
      data.lighthouseResult.audits['first-meaningful-paint'];
    const mainThreadWorkBreakdownData =
      data.lighthouseResult.audits['mainthread-work-breakdown'];
    const unusedCssRulesData = data.lighthouseResult.audits['unused-css-rules'];
    const speedIndexData = data.lighthouseResult.audits['speed-index'];
    const thirdPartySummaryData =
      data.lighthouseResult.audits['third-party-summary'];
    const totalByteWeightData =
      data.lighthouseResult.audits['total-byte-weight'];
    const totalBlockingTimeData =
      data.lighthouseResult.audits['total-blocking-time'];
    const timeToInteractiveData = data.lighthouseResult.audits['interactive'];
    const domSizeData = data.lighthouseResult.audits['dom-size'];
    const largestContentfulPaintData =
      data.lighthouseResult.audits['largest-contentful-paint'];

    // Save howl object
    pageSpeedDTO.lighthouseObject = mainLighthouseObjet;

    // First Contentful Paint Data
    pageSpeedDTO.firstContentfulPaintScore = firstContentfulPaintData.score;
    pageSpeedDTO.firstContentfulPaintNumericValue =
      firstContentfulPaintData.numericUnit;
    pageSpeedDTO.firstContentfulPaintNumericValue =
      firstContentfulPaintData.numericValue;
    pageSpeedDTO.firstContentfulPaintDisplayValue =
      firstContentfulPaintData.displayValue;

    // First Meaningful Paint Data
    pageSpeedDTO.firstMeaningfulPaintScore = firstMeaningfulPaintData.score;
    pageSpeedDTO.firstMeaningfulPaintNumericValue =
      firstMeaningfulPaintData.numericValue;
    pageSpeedDTO.firstMeaningfulPaintNumericUnit =
      firstMeaningfulPaintData.numericUnit;
    pageSpeedDTO.firstMeaningfulPaintDisplayValue =
      firstMeaningfulPaintData.displayValue;

    // Main Thread Work Breakdown Data
    pageSpeedDTO.mainThreadWorkBreakdownDisplayValue =
      mainThreadWorkBreakdownData.displayValue;
    pageSpeedDTO.mainThreadWorkBreakdownNumricValue =
      mainThreadWorkBreakdownData.numericValue;
    pageSpeedDTO.mainThreadWorkBreakdownNumericUnit =
      mainThreadWorkBreakdownData.numericUnit;
    pageSpeedDTO.mainThreadWorkBreakdownItemsDuration = [];
    const items = mainThreadWorkBreakdownData.details.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      pageSpeedDTO.mainThreadWorkBreakdownItemsDuration.push(item.duration);
    }
    pageSpeedDTO.mainThreadWorkBreakdownItemsGroupLabel = [];
    const group = mainThreadWorkBreakdownData.details.items;
    for (let i = 0; i < group.length; i++) {
      const item = group[i];
      pageSpeedDTO.mainThreadWorkBreakdownItemsGroupLabel.push(item.groupLabel);
    }
    // Largest Contentful Paint Data
    pageSpeedDTO.largestContentfulPaintScore = largestContentfulPaintData.score;
    pageSpeedDTO.largestContentfulPaintDisplayValue =
      largestContentfulPaintData.displayValue;
    pageSpeedDTO.largestContentfulPaintNumericValue =
      largestContentfulPaintData.numericValue;
    pageSpeedDTO.largestContentfulPaintNumericUnit =
      largestContentfulPaintData.numericUnit;

    // Unused CSS Rules Data
    pageSpeedDTO.unusedCssRulesItems = [];
    const cssdata = unusedCssRulesData.details.items;
    for (let i = 0; i < cssdata.length; i++) {
      const item = cssdata[i];
      pageSpeedDTO.unusedCssRulesItems.push(item);
    }

    // Speed Index Data
    pageSpeedDTO.speedIndexScore = speedIndexData.score;
    pageSpeedDTO.speedIndexDisplayValue = speedIndexData.displayValue;
    pageSpeedDTO.speedIndexNumericValue = speedIndexData.numericValue;
    pageSpeedDTO.speedIndexNumericUnit = speedIndexData.numericUnit;

    // Third Party Summary Data
    pageSpeedDTO.thirdPartySummaryDisplayValue =
      thirdPartySummaryData.displayValue;
    // Third Party Summary Url
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.detail &&
      thirdPartySummaryData.detail.items
    ) {
      pageSpeedDTO.thirdPartySummaryItemsUrl = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          pageSpeedDTO.thirdPartySummaryItemsUrl.push(subItem.url);
        }
      }
    }
    // Third Party Summary Transfer Size
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      pageSpeedDTO.thirdPartySummaryItemsTransfer = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          pageSpeedDTO.thirdPartySummaryItemsTransfer.push(
            subItem.transferSize,
          );
        }
      }
    }
    // Third Party Summary Main Thread Time
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      pageSpeedDTO.thirdPartySummaryItemsMainThred = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          pageSpeedDTO.thirdPartySummaryItemsMainThred.push(
            subItem.mainThreadTime,
          );
        }
      }
    }
    // Third Party Summary Blocking Time
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      pageSpeedDTO.thirdPartySummaryItemsBlockingTime = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          pageSpeedDTO.thirdPartySummaryItemsBlockingTime.push(
            subItem.blockingTime,
          );
        }
      }
    }

    // Total Byte Weight Data
    pageSpeedDTO.totalByteWeightScore = totalByteWeightData.score;
    pageSpeedDTO.totalByteWeightDisplayValue = totalByteWeightData.displayValue;
    pageSpeedDTO.totalByteWeightNumericValue = totalByteWeightData.numericValue;
    pageSpeedDTO.totalByteWeightNumericUnit = totalByteWeightData.numericUnit;
    pageSpeedDTO.totalByteWeightItemsUrl = [];
    const byteUrl = totalByteWeightData.details.items;
    for (let i = 0; i < byteUrl.length; i++) {
      const item = byteUrl[i];
      pageSpeedDTO.totalByteWeightItemsUrl.push(item.url);
    }
    pageSpeedDTO.totalByteWeightItemsTotalBytes = [];
    const totalByte = totalByteWeightData.details.items;
    for (let i = 0; i < totalByte.length; i++) {
      const item = totalByte[i];
      pageSpeedDTO.totalByteWeightItemsUrl.push(item.url);
    }

    // Total Blocking Time Data
    pageSpeedDTO.totalBlockingTimeScore = totalBlockingTimeData.score;
    pageSpeedDTO.totalBlockingTimeDisplayValue =
      totalBlockingTimeData.displayValue;
    pageSpeedDTO.totalBlockingTimeNumericValue =
      totalBlockingTimeData.numericValue;
    pageSpeedDTO.totalBlockingTimeNumericUnit =
      totalBlockingTimeData.numericUnit;

    // Time To Interactive Data
    pageSpeedDTO.timeToInteractiveScore = timeToInteractiveData.score;
    pageSpeedDTO.timeToInteractiveDisplayValue =
      timeToInteractiveData.displayValue;
    pageSpeedDTO.timeToInteractiveNumericValue =
      timeToInteractiveData.numericValue;
    pageSpeedDTO.timeToInteractiveNumericUnit =
      timeToInteractiveData.numericUnit;

    // DOM Size Data
    pageSpeedDTO.domSizeScore = domSizeData.score;
    pageSpeedDTO.domSizeDisplayValue = domSizeData.displayValue;
    pageSpeedDTO.domSizeNumericValue = domSizeData.numericValue;
    pageSpeedDTO.domSizeNumericUnit = domSizeData.numericUnit;

    const entity = convertDTOToEntity(pageSpeedDTO, website);

    await this.pageSpeedEntity.save(entity);
  }
  async getPageSpeedsByWebsiteId(id: string): Promise<PageSpeedData[]> {
    return this.pageSpeedEntity.find({
      where: { website: { id: id } },
    });
  }
}
