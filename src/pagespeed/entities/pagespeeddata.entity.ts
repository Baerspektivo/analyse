import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Website } from 'src/customer/entities/website.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PageSpeedData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  url: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @JoinColumn({ name: 'urlId' })
  website: Website;

  @Exclude()
  @Column('json')
  @ApiProperty({ type: () => [String] })
  lighthouseObjet: string[];

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
  firstMeaningfulPaintNumericValue: number;

  @Column()
  @ApiProperty()
  firstMeaningfulPaintNumericUnit: string;

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

  @Column('json')
  @ApiProperty({ type: () => [String] })
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
}
