import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IThirdPartySummaryDetailsItemSubItemItem } from 'src/shared/pagespeed/thirdpartysummary.interface';
import { Transform } from 'class-transformer';

@Entity()
export class PageSpeedData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  firstContentfulPaintDisplayValue: string;

  @Column()
  @ApiProperty()
  firstContentfulPaintScore: number;

  @Column()
  @ApiProperty()
  firstContentfulPaintNumericValue: number;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintScore: number;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintDisplayValue: string;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintNumericValue: string;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintNumericUnit: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownDisplayValue: string;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownNumricValue: string;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownNumericUnit: string;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownItemsGroupLable: string;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownItemsDuration: string;

  @Column()
  @ApiProperty()
  comulativeLayoutShiftScore: string;

  @Column()
  @ApiProperty()
  comulativeLayoutShiftDisplayValue: string;

  @Column()
  @ApiProperty()
  critialRequestChainsDisplayValue: string;

  @Column()
  @ApiProperty()
  serverResponseTimeScore: string;

  @Column()
  @ApiProperty()
  serverResponseTimeDisplayValue: string;

  @Column()
  @ApiProperty()
  serverResponseTimeNumericValue: string;

  @Column()
  @ApiProperty()
  serverResponseTimeNumericUnit: string;

  @Column()
  @ApiProperty()
  pageSpeedScore: string;

  @Column()
  @ApiProperty()
  speedIndexScore: string;

  @Column()
  @ApiProperty()
  speedIndexDisplayValue: string;

  @Column()
  @ApiProperty()
  largestContentfulPaintScore: string;

  @Column()
  @ApiProperty()
  largestContentfulPaintDisplayValue: string;

  @Column()
  @ApiProperty()
  largestContentfulPaintNumericValue: string;

  @Column()
  @ApiProperty()
  largestContentfulPaintNumericUnit: string;

  @Column()
  @ApiProperty()
  totalBlockingTimeScore: string;

  @Column()
  @ApiProperty()
  totalBlockingTimeDisplayValue: string;

  @Column()
  @ApiProperty()
  totalBlockingTimeNumericValue: string;

  @Column()
  @ApiProperty()
  totalBlockingTimeNumericUnit: string;

  @Column()
  @ApiProperty()
  unusedCssRulesItems: string;

  @Column({ nullable: true })
  @ApiProperty()
  thirdPartySummaryDisplayValue: string | null;

  @Column('text')
  @ApiProperty({ type: () => [String] })
  @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
  @Transform(({ value }) => JSON.parse(value), { toPlainOnly: true })
  thirdPartySummaryItemsUrl: IThirdPartySummaryDetailsItemSubItemItem[];

  @Column()
  @ApiProperty()
  thirdPartySummaryItemsTransfer: string;

  @Column()
  @ApiProperty()
  thirdPartySummaryItemsMainThred: string;

  @Column()
  @ApiProperty()
  thirdPartySummaryItemsBlockingTime: string;

  @Column()
  @ApiProperty()
  timeToInteractiveScore: string;

  @Column()
  @ApiProperty()
  timeToInteractiveDisplayValue: string;

  @Column()
  @ApiProperty()
  timeToInteractiveNumericValue: string;

  @Column()
  @ApiProperty()
  timeToInteractiveNumericUnit: string;

  @Column()
  @ApiProperty()
  totalByteWeightScore: string;

  @Column()
  @ApiProperty()
  totalByteWeightDisplayValue: string;

  @Column()
  @ApiProperty()
  totalByteWeightNumericValue: string;

  @Column()
  @ApiProperty()
  totalByteWeightNumericUnit: string;

  @Column()
  @ApiProperty()
  totalByteWeightItemsUrl: string;

  @Column()
  @ApiProperty()
  totalByteWeightItemsTotalBytes: string;

  @Column()
  @ApiProperty()
  networkRequestsItemUrl: string;

  @Column()
  @ApiProperty()
  networkRequestsItemRequestTime: string;

  @Column()
  @ApiProperty()
  bootupTimeDisplayValue: string;

  @Column()
  @ApiProperty()
  bootupTimeNumericValue: string;

  @Column()
  @ApiProperty()
  bootupTimeNumericUnit: string;

  @Column()
  @ApiProperty()
  domSizeScore: string;

  @Column()
  @ApiProperty()
  domSizeDisplayValue: string;

  @Column()
  @ApiProperty()
  domSizeNumericValue: string;

  @Column()
  @ApiProperty()
  domSizeNumericUnit: string;
}
