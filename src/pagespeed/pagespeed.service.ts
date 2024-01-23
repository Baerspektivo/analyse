import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PagespeedService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(PageSpeedData)
    private pageSpeedEntity: Repository<PageSpeedData>,
  ) {}

  API_KEY = this.configService.get<string>('API_KEY');
  //Request with URL and API Key to Google Lighthouse

  // async urlCheck(url: string): Promise<any> {
  //   console.log('CHECK URL:', url);
  //   if (!url.startsWith('http://') && !url.startsWith('https://')) {
  //     url = 'https://' + url;
  //   }
  //   const encodedUrl = encodeURI(url);
  //   const expression = new RegExp(
  //     /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
  //   );
  //   if (!url || url === '' || url.match(expression) === null) {
  //     throw new HttpException('Bad Request', 400);
  //   }
  //   return encodedUrl;
  // }

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
  // async pageSpeedRequest(url: string): Promise<any> {
  //   const formatterUrl = await this.urlCheck(url);
  //   const protocol = formatterUrl.startsWith('http://')
  //     ? 'http://'
  //     : 'https://';
  //   const apiUrl = `httpService://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${protocol}${formatterUrl}&key=${this.API_KEY}`;
  //   const response$ = this.httpService
  //     .get(apiUrl)
  //     .pipe(map((response) => response.data));
  //   const data = await firstValueFrom(response$);
  //   return data;
  // }
  // async pageSpeedRequest(url?: string): Promise<any> {
  //   const formatterUrl = await this.urlCheck(url);
  //   console.log('URL:', formatterUrl);
  //   if (
  //     formatterUrl.startsWith('http://') ||
  //     formatterUrl.startsWith('https://')
  //   ) {
  //     console.log('URLs StartsWith:', formatterUrl);
  //     const response$ = this.httpService
  //       .get(
  //         `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formatterUrl}&key=${this.API_KEY}`,
  //       )
  //       .pipe(map((response) => response.data));
  //     const data = await firstValueFrom(response$);
  //     return data;
  //   } else {
  //     try {
  //       const urlToTry = 'https://' + formatterUrl;
  //       console.log('URL Trying:', urlToTry);
  //       const response$ = this.httpService
  //         .get(
  //           `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formatterUrl}&key=${this.API_KEY}`,
  //         )
  //         .pipe(map((response) => response.data));
  //       const data = await firstValueFrom(response$);
  //       return data;
  //     } catch (error) {
  //       const urlToTry = 'http://' + formatterUrl;
  //       console.log('URL Trying:', urlToTry);
  //       const response$ = this.httpService
  //         .get(
  //           `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formatterUrl}&key=${this.API_KEY}`,
  //         )
  //         .pipe(map((response) => response.data));
  //       const data = await firstValueFrom(response$);
  //       return data;
  //     }
  //   }
  // }

  async getPageSpeedResult(url: string): Promise<void> {
    const data = await this.pageSpeedRequest(url);

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

    // Create new entity and save to database
    const entity = new PageSpeedData();

    // Save customer url
    entity.lighthouseObjet = mainLighthouseObjet;
    entity.url = url;

    // First Contentful Paint Data
    entity.firstContentfulPaintScore = firstContentfulPaintData.score;
    entity.firstContentfulPaintNumericValue =
      firstContentfulPaintData.numericUnit;
    entity.firstContentfulPaintNumericValue =
      firstContentfulPaintData.numericValue;
    entity.firstContentfulPaintDisplayValue =
      firstContentfulPaintData.displayValue;

    // First Meaningful Paint Data
    entity.firstMeaningfulPaintScore = firstMeaningfulPaintData.score;
    entity.firstMeaningfulPaintNumericValue =
      firstMeaningfulPaintData.numericValue;
    entity.firstMeaningfulPaintNumericUnit =
      firstMeaningfulPaintData.numericUnit;
    entity.firstMeaningfulPaintDisplayValue =
      firstMeaningfulPaintData.displayValue;

    // Main Thread Work Breakdown Data
    entity.mainThreadWorkBreakdownDisplayValue =
      mainThreadWorkBreakdownData.displayValue;
    entity.mainThreadWorkBreakdownNumricValue =
      mainThreadWorkBreakdownData.numericValue;
    entity.mainThreadWorkBreakdownNumericUnit =
      mainThreadWorkBreakdownData.numericUnit;
    entity.mainThreadWorkBreakdownItemsDuration = [];
    const items = mainThreadWorkBreakdownData.details.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      entity.mainThreadWorkBreakdownItemsDuration.push(item.duration);
    }
    entity.mainThreadWorkBreakdownItemsGroupLabel = [];
    const group = mainThreadWorkBreakdownData.details.items;
    for (let i = 0; i < group.length; i++) {
      const item = group[i];
      entity.mainThreadWorkBreakdownItemsGroupLabel.push(item.groupLabel);
    }
    // Largest Contentful Paint Data
    entity.largestContentfulPaintScore = largestContentfulPaintData.score;
    entity.largestContentfulPaintDisplayValue =
      largestContentfulPaintData.displayValue;
    entity.largestContentfulPaintNumericValue =
      largestContentfulPaintData.numericValue;
    entity.largestContentfulPaintNumericUnit =
      largestContentfulPaintData.numericUnit;

    // Unused CSS Rules Data
    entity.unusedCssRulesItems = [];
    const cssdata = unusedCssRulesData.details.items;
    for (let i = 0; i < cssdata.length; i++) {
      const item = cssdata[i];
      entity.unusedCssRulesItems.push(item);
    }

    // Speed Index Data
    entity.speedIndexScore = speedIndexData.score;
    entity.speedIndexDisplayValue = speedIndexData.displayValue;
    entity.speedIndexNumericValue = speedIndexData.numericValue;
    entity.speedIndexNumericUnit = speedIndexData.numericUnit;

    // Third Party Summary Data
    entity.thirdPartySummaryDisplayValue = thirdPartySummaryData.displayValue;
    // Third Party Summary Url
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.detail &&
      thirdPartySummaryData.detail.items
    ) {
      entity.thirdPartySummaryItemsUrl = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          entity.thirdPartySummaryItemsUrl.push(subItem.url);
        }
      }
    }
    // Third Party Summary Transfer Size
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      entity.thirdPartySummaryItemsTransfer = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          entity.thirdPartySummaryItemsTransfer.push(subItem.transferSize);
        }
      }
    }
    // Third Party Summary Main Thread Time
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      entity.thirdPartySummaryItemsMainThred = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          entity.thirdPartySummaryItemsMainThred.push(subItem.mainThreadTime);
        }
      }
    }
    // Third Party Summary Blocking Time
    if (
      thirdPartySummaryData &&
      thirdPartySummaryData.details &&
      thirdPartySummaryData.details.items
    ) {
      entity.thirdPartySummaryItemsBlockingTime = [];
      for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
        const item = thirdPartySummaryData.details.items[i];
        for (let j = 0; j < item.subItems.items.length; j++) {
          const subItem = item.subItems.items[j];
          entity.thirdPartySummaryItemsBlockingTime.push(subItem.blockingTime);
        }
      }
    }

    // Total Byte Weight Data
    entity.totalByteWeightScore = totalByteWeightData.score;
    entity.totalByteWeightDisplayValue = totalByteWeightData.displayValue;
    entity.totalByteWeightNumericValue = totalByteWeightData.numericValue;
    entity.totalByteWeightNumericUnit = totalByteWeightData.numericUnit;
    entity.totalByteWeightItemsUrl = [];
    const byteUrl = totalByteWeightData.details.items;
    for (let i = 0; i < byteUrl.length; i++) {
      const item = byteUrl[i];
      entity.totalByteWeightItemsUrl.push(item.url);
    }
    entity.totalByteWeightItemsTotalBytes = [];
    const totalByte = totalByteWeightData.details.items;
    for (let i = 0; i < totalByte.length; i++) {
      const item = totalByte[i];
      entity.totalByteWeightItemsUrl.push(item.url);
    }

    // Total Blocking Time Data
    entity.totalBlockingTimeScore = totalBlockingTimeData.score;
    entity.totalBlockingTimeDisplayValue = totalBlockingTimeData.displayValue;
    entity.totalBlockingTimeNumericValue = totalBlockingTimeData.numericValue;
    entity.totalBlockingTimeNumericUnit = totalBlockingTimeData.numericUnit;

    // Time To Interactive Data
    entity.timeToInteractiveScore = timeToInteractiveData.score;
    entity.timeToInteractiveDisplayValue = timeToInteractiveData.displayValue;
    entity.timeToInteractiveNumericValue = timeToInteractiveData.numericValue;
    entity.timeToInteractiveNumericUnit = timeToInteractiveData.numericUnit;

    // DOM Size Data
    entity.domSizeScore = domSizeData.score;
    entity.domSizeDisplayValue = domSizeData.displayValue;
    entity.domSizeNumericValue = domSizeData.numericValue;
    entity.domSizeNumericUnit = domSizeData.numericUnit;

    await this.pageSpeedEntity.save(entity);
  }
}
