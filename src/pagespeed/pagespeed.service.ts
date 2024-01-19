import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import type { ILigthHouseMetrics } from 'src/shared/pagespeed/pagespeed.interface';
import {
  IThirdPartySummaryDetailsItem,
  IThirdPartySummaryDetailsItemSubItem,
  IThirdPartySummaryDetailsItemSubItemItem,
} from 'src/shared/pagespeed/thirdpartysummary.interface';
import { type } from 'os';

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
  async pageSpeedRequest(url?: string): Promise<any> {
    console.log('URL:', url);
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('URLs StartsWith:', url);
      const response$ = this.httpService
        .get(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${this.API_KEY}`,
        )
        .pipe(map((response) => response.data));
      const data = await firstValueFrom(response$);
      return data;
    } else {
      try {
        const urlToTry = 'https://' + url;
        console.log('URL Trying:', urlToTry);
        const response$ = this.httpService
          .get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${urlToTry}&key=${this.API_KEY}`,
          )
          .pipe(map((response) => response.data));
        const data = await firstValueFrom(response$);
        return data;
      } catch (error) {
        const urlToTry = 'http://' + url;
        console.log('URL Trying:', urlToTry);
        const response$ = this.httpService
          .get(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${urlToTry}&key=${this.API_KEY}`,
          )
          .pipe(map((response) => response.data));
        const data = await firstValueFrom(response$);
        return data;
      }
    }
  }

  async getPageSpeedResult(url: string): Promise<void> {
    const data = await this.pageSpeedRequest(url);

    // Datas from pagespeed request
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
    // Create new entity and save to database
    const entity = new PageSpeedData();

    // Save customer url
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
    entity.mainThreadWorkBreakdownItemsDuration =
      mainThreadWorkBreakdownData.details.items.map(
        (item: any) => item.duration,
      );
    entity.mainThreadWorkBreakdownItemsGroupLable =
      mainThreadWorkBreakdownData.details.items.map(
        (item: any) => item.groupLable,
      );

    // Unused CSS Rules Data
    entity.unusedCssRulesItems = unusedCssRulesData.details.items.map(
      (item: any) => item.url,
    );

    // Speed Index Data
    entity.speedIndexScore = speedIndexData.score;
    entity.speedIndexDisplayValue = speedIndexData.displayValue;

    // Third Party Summary Data
    entity.thirdPartySummaryDisplayValue = thirdPartySummaryData.displayValue;
    entity.thirdPartySummaryItemsUrl =
      thirdPartySummaryData.details.items.flatMap(
        (item: IThirdPartySummaryDetailsItem) => {
          // Check if subItems exists and is an array
          if (item.subItems && Array.isArray(item.subItems)) {
            // Mapping top-level items
            return item.subItems.flatMap(
              (subItem: IThirdPartySummaryDetailsItemSubItem) => {
                // Mapping subitems
                return [
                  {
                    url: subItem.items.url,
                  },
                ];
              },
            );
          } else {
            return [];
          }
        },
      );
    // entity.thirdPartySummaryItemsTransfer =
    //   thirdPartySummaryData.details.items.map((item: any) => item.transferSize);
    // entity.thirdPartySummaryItemsMainThred =
    //   thirdPartySummaryData.details.items.map(
    //     (item: any) => item.mainThreadTime,
    //   );
    // entity.thirdPartySummaryItemsBlockingTime =
    //   thirdPartySummaryData.details.items.map((item: any) => item.blockingTime);

    // Total Byte Weight Data
    // entity.totalByteWeightScore = totalByteWeightData.score;
    // entity.totalByteWeightDisplayValue = totalByteWeightData.displayValue;
    // entity.totalByteWeightNumericValue = totalByteWeightData.numericValue;
    // entity.totalByteWeightNumericUnit = totalByteWeightData.numericUnit;
    // entity.totalByteWeightItemsUrl = totalByteWeightData.details.items.map(
    //   (item: any) => item.url,
    // );
    // entity.totalByteWeightItemsTotalBytes =
    //   totalByteWeightData.details.items.map((item: any) => item.totalBytes);

    // Total Blocking Time Data
    // entity.totalBlockingTimeScore = totalBlockingTimeData.score;
    // entity.totalBlockingTimeDisplayValue = totalBlockingTimeData.displayValue;
    // entity.totalBlockingTimeNumericValue = totalBlockingTimeData.numericValue;
    // entity.totalBlockingTimeNumericUnit = totalBlockingTimeData.numericUnit;

    // Time To Interactive Data
    // entity.timeToInteractiveScore = timeToInteractiveData.score;
    // entity.timeToInteractiveDisplayValue = timeToInteractiveData.displayValue;
    // entity.timeToInteractiveNumericValue = timeToInteractiveData.numericValue;
    // entity.timeToInteractiveNumericUnit = timeToInteractiveData.numericUnit;

    // DOM Size Data
    // entity.domSizeScore = domSizeData.score;
    // entity.domSizeDisplayValue = domSizeData.displayValue;
    // entity.domSizeNumericValue = domSizeData.numericValue;
    // entity.domSizeNumericUnit = domSizeData.numericUnit;

    await this.pageSpeedEntity.save(entity);
  }
}
