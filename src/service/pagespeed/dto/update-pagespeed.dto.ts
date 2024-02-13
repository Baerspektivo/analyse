import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UpdateWebsiteDto } from '../../website/dto/update-website.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePageSpeedDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => UpdateWebsiteDto })
  website: UpdateWebsiteDto;

  @Exclude()
  @ApiProperty()
  lighthouseObject: any;

  @ApiProperty()
  @IsString()
  firstContentfulPaintDisplayValue: string;

  @ApiProperty()
  @IsNumber()
  firstContentfulPaintScore: number;

  @ApiProperty()
  @IsNumber()
  firstContentfulPaintNumericValue: number;

  @ApiProperty()
  @IsNumber()
  firstMeaningfulPaintScore: number;

  @ApiProperty()
  @IsString()
  firstMeaningfulPaintDisplayValue: string;

  @ApiProperty()
  @IsNumber()
  firstMeaningfulPaintNumericValue: number;

  @ApiProperty()
  @IsString()
  firstMeaningfulPaintNumericUnit: string;

  @ApiProperty()
  @IsString()
  mainThreadWorkBreakdownDisplayValue: string;

  @ApiProperty()
  @IsNumber()
  mainThreadWorkBreakdownNumricValue: number;

  @ApiProperty()
  @IsString()
  mainThreadWorkBreakdownNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  @IsString()
  mainThreadWorkBreakdownItemsGroupLabel: string[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  mainThreadWorkBreakdownItemsDuration: number[];

  @ApiProperty()
  @IsNumber()
  speedIndexScore: number;

  @ApiProperty()
  @IsString()
  speedIndexDisplayValue: string;

  @ApiProperty()
  @IsNumber()
  speedIndexNumericValue: number;

  @ApiProperty()
  @IsString()
  speedIndexNumericUnit: string;

  @ApiProperty()
  @IsString()
  largestContentfulPaintScore: string;

  @ApiProperty()
  @IsString()
  largestContentfulPaintDisplayValue: string;

  @ApiProperty()
  @IsString()
  largestContentfulPaintNumericValue: string;

  @ApiProperty()
  @IsString()
  largestContentfulPaintNumericUnit: string;

  @ApiProperty()
  @IsString()
  totalBlockingTimeScore: string;

  @ApiProperty()
  @IsString()
  totalBlockingTimeDisplayValue: string;

  @ApiProperty()
  @IsString()
  totalBlockingTimeNumericValue: string;

  @ApiProperty()
  @IsString()
  totalBlockingTimeNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  @IsString()
  unusedCssRulesItems: string[];

  @ApiProperty()
  thirdPartySummaryDisplayValue: string | null;

  @ApiProperty({ type: () => [String] })
  @IsString()
  thirdPartySummaryItemsUrl: string[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  thirdPartySummaryItemsTransfer: number[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  thirdPartySummaryItemsMainThred: number[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  thirdPartySummaryItemsBlockingTime: number[];

  @ApiProperty()
  @IsString()
  timeToInteractiveScore: string;

  @ApiProperty()
  @IsString()
  timeToInteractiveDisplayValue: string;

  @ApiProperty()
  @IsString()
  timeToInteractiveNumericValue: string;

  @ApiProperty()
  @IsString()
  timeToInteractiveNumericUnit: string;

  @ApiProperty()
  totalByteWeightScore: number | null;

  @ApiProperty()
  @IsString()
  totalByteWeightDisplayValue: string;

  @ApiProperty()
  @IsNumber()
  totalByteWeightNumericValue: number;

  @ApiProperty()
  @IsString()
  totalByteWeightNumericUnit: string;

  @ApiProperty({ type: () => [String] })
  @IsString()
  totalByteWeightItemsUrl: string[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  totalByteWeightItemsTotalBytes: number[];

  @ApiProperty()
  domSizeScore: number | null;

  @ApiProperty()
  @IsString()
  domSizeDisplayValue: string;

  @ApiProperty()
  @IsString()
  domSizeNumericValue: string;

  @ApiProperty()
  @IsString()
  domSizeNumericUnit: string;
}
