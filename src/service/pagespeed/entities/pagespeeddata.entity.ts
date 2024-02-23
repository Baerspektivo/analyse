import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Website } from '../../website/entities/website.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PageSpeedData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @ManyToOne(() => Website, (website) => website.pageSpeedDatas)
  @JoinColumn({ name: 'websiteId' })
  @ApiProperty()
  website: Website;

  @Exclude()
  @Column('json')
  @ApiProperty({ type: () => [String] })
  lighthouseObject: string[];

  //#region firstContentfulPaint
  @Column()
  @ApiProperty()
  firstContentfulPaintDisplayValue: string;

  @Column()
  @ApiProperty()
  firstContentfulPaintScore: number;

  @Column()
  @ApiProperty()
  firstContentfulPaintNumericValue: number;
  //#endregion

  //#region firstMeaningfulPaint
  @Column()
  @ApiProperty()
  firstMeaningfulPaintScore: number;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintDisplayValue: string;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintNumericValue: number;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintNumericUnit: string;
  //#endregion

  //#region mainThreadWorkBreakdown
  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownDisplayValue: string;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownNumricValue: number;

  @Column()
  @ApiProperty()
  mainThreadWorkBreakdownNumericUnit: string;

  @Column('json')
  @ApiProperty({ type: () => [String] })
  mainThreadWorkBreakdownItemsGroupLabel: string[];

  @Column('json')
  @ApiProperty({ type: () => [Number] })
  mainThreadWorkBreakdownItemsDuration: number[];
  //#endregion

  @Column()
  @ApiProperty()
  speedIndexScore: number;

  @Column()
  @ApiProperty()
  speedIndexDisplayValue: string;

  @Column()
  @ApiProperty()
  speedIndexNumericValue: number;

  @Column()
  @ApiProperty()
  speedIndexNumericUnit: string;

  @Column({ nullable: true })
  @ApiProperty()
  largestContentfulPaintScore: string;

  @Column({ nullable: true })
  @ApiProperty()
  largestContentfulPaintDisplayValue: string;

  @Column({ nullable: true })
  @ApiProperty()
  largestContentfulPaintNumericValue: string;

  @Column({ nullable: true })
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

  @Column('json')
  @ApiProperty({ type: () => [String], nullable: true })
  unusedCssRulesItems: string[];

  @Column({ nullable: true })
  @ApiProperty()
  thirdPartySummaryDisplayValue: string | null;

  @Column('json', { nullable: true })
  @ApiProperty({ type: () => [String] })
  thirdPartySummaryItemsUrl: string[];

  @Column('json', { nullable: true })
  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsTransfer: number[];

  @Column('json', { nullable: true })
  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsMainThred: number[];

  @Column('json', { nullable: true })
  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsBlockingTime: number[];

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

  @Column({ nullable: true })
  @ApiProperty()
  totalByteWeightScore: number | null;

  @Column()
  @ApiProperty()
  totalByteWeightDisplayValue: string;

  @Column()
  @ApiProperty()
  totalByteWeightNumericValue: number;

  @Column()
  @ApiProperty()
  totalByteWeightNumericUnit: string;

  @Column('json')
  @ApiProperty({ type: () => [String] })
  totalByteWeightItemsUrl: string[];

  @Column('json')
  @ApiProperty({ type: () => [Number] })
  totalByteWeightItemsTotalBytes: number[];

  @Column({ nullable: true })
  @ApiProperty()
  domSizeScore: number | null;

  @Column()
  @ApiProperty()
  domSizeDisplayValue: string;

  @Column()
  @ApiProperty()
  domSizeNumericValue: string;

  @Column()
  @ApiProperty()
  domSizeNumericUnit: string;

  @Column('json')
  @ApiProperty({ type: () => [String], nullable: true })
  unusedJavaScript: string[];

  @Column('json')
  @ApiProperty({ type: () => [String], nullable: true })
  lcpLazyLoaded: string[];
}
