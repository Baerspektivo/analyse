import { LoadWebsiteDto } from 'src/service/website/dto/load-website.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class LoadPageSpeedDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: () => LoadWebsiteDto })
  website: LoadWebsiteDto;

  @Exclude()
  @ApiProperty({ type: () => [String] })
  lighthouseObjet: string[];

  @ApiProperty()
  firstContentfulPaintDisplayValue: string;

  @ApiProperty()
  firstContentfulPaintScore: number;

  @ApiProperty()
  firstContentfulPaintNumericValue: number;

  @ApiProperty()
  firstMeaningfulPaintScore: number;

  @ApiProperty()
  firstMeaningfulPaintDisplayValue: string;

  @ApiProperty()
  firstMeaningfulPaintNumericValue: number;

  @ApiProperty()
  firstMeaningfulPaintNumericUnit: string;

  @ApiProperty()
  mainThreadWorkBreakdownDisplayValue: string;

  @ApiProperty()
  mainThreadWorkBreakdownNumricValue: number;

  @ApiProperty()
  mainThreadWorkBreakdownNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  mainThreadWorkBreakdownItemsGroupLabel: string[];

  @ApiProperty({ type: () => [Number] })
  mainThreadWorkBreakdownItemsDuration: number[];

  @ApiProperty()
  speedIndexScore: number;

  @ApiProperty()
  speedIndexDisplayValue: string;

  @ApiProperty()
  speedIndexNumericValue: number;

  @ApiProperty()
  speedIndexNumericUnit: string;

  @ApiProperty()
  largestContentfulPaintScore: string;

  @ApiProperty()
  largestContentfulPaintDisplayValue: string;

  @ApiProperty()
  largestContentfulPaintNumericValue: string;

  @ApiProperty()
  largestContentfulPaintNumericUnit: string;

  @ApiProperty()
  totalBlockingTimeScore: string;

  @ApiProperty()
  totalBlockingTimeDisplayValue: string;

  @ApiProperty()
  totalBlockingTimeNumericValue: string;

  @ApiProperty()
  totalBlockingTimeNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  unusedCssRulesItems: string[];

  @ApiProperty()
  thirdPartySummaryDisplayValue: string | null;

  @ApiProperty({ type: () => [String] })
  thirdPartySummaryItemsUrl: string[];

  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsTransfer: number[];

  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsMainThred: number[];

  @ApiProperty({ type: () => [Number] })
  thirdPartySummaryItemsBlockingTime: number[];

  @ApiProperty()
  timeToInteractiveScore: string;

  @ApiProperty()
  timeToInteractiveDisplayValue: string;

  @ApiProperty()
  timeToInteractiveNumericValue: string;

  @ApiProperty()
  timeToInteractiveNumericUnit: string;

  @ApiProperty()
  totalByteWeightScore: number | null;

  @ApiProperty()
  totalByteWeightDisplayValue: string;

  @ApiProperty()
  totalByteWeightNumericValue: number;

  @ApiProperty()
  totalByteWeightNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  totalByteWeightItemsUrl: string[];

  @ApiProperty({ type: () => [Number] })
  totalByteWeightItemsTotalBytes: number[];

  @ApiProperty()
  domSizeScore: number | null;

  @ApiProperty()
  domSizeDisplayValue: string;

  @ApiProperty()
  domSizeNumericValue: string;

  @ApiProperty()
  domSizeNumericUnit: string;
}
