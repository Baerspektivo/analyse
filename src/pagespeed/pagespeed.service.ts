import { Injectable, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PagespeedService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(PageSpeedData)
    private pageSpeedEntity: Repository<PageSpeedData>,
  ) {}

  API_KEY = this.configService.get<string>('API_KEY');

  async pageSpeedRequest(url?: string): Promise<any> {
    const response$ = this.httpService
      .get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${this.API_KEY}`,
      )
      .pipe(map((response) => response.data));
    const data = await firstValueFrom(response$);
    return data;
  }

  async getPageSpeedResult(@Param('url') url: string): Promise<void> {
    const data = await this.pageSpeedRequest(url);
    const entity = new PageSpeedData();
    entity.firstContentfulPaintScore =
      data.lighthouseResult.audits['first-contentful-paint'].score;
    entity.firstMeaningfulPaintNumericUnit =
      data.lighthouseResult.audits['first-contentful-paint'].numericUnit;
    entity.firstContentfulPaintNumericValue =
      data.lighthouseResult.audits['first-contentful-paint'].numericValue;
    entity.firstContentfulPaintDisplayValue =
      data.lighthouseResult.audits['first-contentful-paint'].displayValue;
    console.log(
      'Score',
      entity.firstContentfulPaintScore,
      'NumericNum',
      entity.firstContentfulPaintNumericValue,
      'NumericUnit',
      entity.firstMeaningfulPaintNumericUnit,
      'DisplayValue',
      entity.firstContentfulPaintDisplayValue,
    );
    await this.pageSpeedEntity.save(entity);
  }
}
