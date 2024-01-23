import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { Like, Repository } from 'typeorm';
import { PageSpeedData } from './entities/pagespeeddata.entity';
import { PagespeedService } from './pagespeed.service';

@Controller('pagespeed')
export class PagespeedController {
  constructor(
    private readonly pageSpeedService: PagespeedService,
    @InjectRepository(PageSpeedData)
    private pageSpeedDataRepository: Repository<PageSpeedData>,
  ) {}

  @Post()
  async getPageSpeedResult(@Body() body: any): Promise<any> {
    const url = body.url;
    return await this.pageSpeedService.getPageSpeedResult(url);
  }

  @Get()
  async handleRequest(
    @Query('url') url: string,
    @Query('mode') mode: string,
    @Res() res: Response,
  ): Promise<void> {
    url = url.replace(/^https:\/\/|\/$/g, '');
    const entities = await this.pageSpeedDataRepository.find({
      where: { url: Like(`%${url}%`) },
    });
    if (!entities) {
      res.status(404).send();
      return;
    }
    if (mode === '') {
      const data = entities.map((entity) =>
        plainToClass(PageSpeedData, entity),
      );
      res.send(data);
    } else if (mode === 'full') {
      res.send(entities);
    } else {
      res.status(400).send('Invalid mode');
    }
  }
}
