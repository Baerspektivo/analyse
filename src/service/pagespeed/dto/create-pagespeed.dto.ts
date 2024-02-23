import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateWebsiteDto } from '../../website/dto/create-website.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePageSpeedDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => CreateWebsiteDto })
  website: CreateWebsiteDto;

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
  @IsOptional()
  largestContentfulPaintScore: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  largestContentfulPaintDisplayValue: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  largestContentfulPaintNumericValue: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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
  @IsOptional()
  unusedCssRulesItems: string[];

  @ApiProperty()
  @IsOptional()
  thirdPartySummaryDisplayValue: string | null;

  @ApiProperty({ type: () => [String] })
  @IsString()
  @IsOptional()
  thirdPartySummaryItemsUrl: string[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  @IsOptional()
  thirdPartySummaryItemsTransfer: number[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  @IsOptional()
  thirdPartySummaryItemsMainThred: number[];

  @ApiProperty({ type: () => [Number] })
  @IsNumber()
  @IsOptional()
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
  @IsOptional()
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

  @ApiProperty({ type: () => [String] })
  @IsString()
  @IsOptional()
  unusedJavaScript: string[];

  @ApiProperty({ type: () => [String] })
  @IsString()
  @IsOptional()
  lcpLazyLoaded: string[];
}
