import { Website } from '../website/entities/website.entity';
import { CreatePageSpeedDto } from './dto/create-pagespeed.dto';
import { PageSpeedData } from './entities/pagespeeddata.entity';

export function convertDTOToEntity(
  dto: CreatePageSpeedDto,
  website: Website,
): PageSpeedData {
  // Create new PageSpeedData entity
  const entity = new PageSpeedData();

  // Datas from pagespeed request

  if (!website) {
    throw new Error(`Website with WebsiteID ${website} not found`);
  }
  entity.website = website;
  // Save howl object
  entity.lighthouseObject = dto.lighthouseObject;

  // First Contentful Paint Data
  entity.firstContentfulPaintScore = dto.firstContentfulPaintScore;
  entity.firstContentfulPaintNumericValue =
    dto.firstContentfulPaintNumericValue;
  entity.firstContentfulPaintDisplayValue =
    dto.firstContentfulPaintDisplayValue;

  // First Meaningful Paint Data
  entity.firstMeaningfulPaintScore = dto.firstMeaningfulPaintScore;
  entity.firstMeaningfulPaintNumericValue =
    dto.firstMeaningfulPaintNumericValue;
  entity.firstMeaningfulPaintNumericUnit = dto.firstMeaningfulPaintNumericUnit;
  entity.firstMeaningfulPaintDisplayValue =
    dto.firstMeaningfulPaintDisplayValue;

  // Main Thread Work Breakdown Data
  entity.mainThreadWorkBreakdownDisplayValue =
    dto.mainThreadWorkBreakdownDisplayValue;
  entity.mainThreadWorkBreakdownNumricValue =
    dto.mainThreadWorkBreakdownNumricValue;
  entity.mainThreadWorkBreakdownNumericUnit =
    dto.mainThreadWorkBreakdownNumericUnit;
  entity.mainThreadWorkBreakdownItemsDuration =
    dto.mainThreadWorkBreakdownItemsDuration;

  entity.mainThreadWorkBreakdownItemsGroupLabel =
    dto.mainThreadWorkBreakdownItemsGroupLabel;
  // Largest Contentful Paint Data
  entity.largestContentfulPaintScore = dto.largestContentfulPaintScore;
  entity.largestContentfulPaintDisplayValue =
    dto.largestContentfulPaintDisplayValue;
  entity.largestContentfulPaintNumericValue =
    dto.largestContentfulPaintNumericValue;
  entity.largestContentfulPaintNumericUnit =
    dto.largestContentfulPaintNumericUnit;

  // Unused CSS Rules Data
  entity.unusedCssRulesItems = dto.unusedCssRulesItems;

  // Speed Index Data
  entity.speedIndexScore = dto.speedIndexScore;
  entity.speedIndexDisplayValue = dto.speedIndexDisplayValue;
  entity.speedIndexNumericValue = dto.speedIndexNumericValue;
  entity.speedIndexNumericUnit = dto.speedIndexNumericUnit;

  // Third Party Summary Data
  entity.thirdPartySummaryDisplayValue = dto.thirdPartySummaryDisplayValue;
  // Third Party Summary Url
  entity.thirdPartySummaryItemsUrl = dto.thirdPartySummaryItemsUrl;

  // Third Party Summary Transfer Size
  entity.thirdPartySummaryItemsTransfer = dto.thirdPartySummaryItemsTransfer;
  // Third Party Summary Main Thread Time
  entity.thirdPartySummaryItemsMainThred = dto.thirdPartySummaryItemsMainThred;
  // Third Party Summary Blocking Time
  entity.thirdPartySummaryItemsBlockingTime =
    dto.thirdPartySummaryItemsBlockingTime;

  // Total Byte Weight Data
  entity.totalByteWeightScore = dto.totalByteWeightScore;
  entity.totalByteWeightDisplayValue = dto.totalByteWeightDisplayValue;
  entity.totalByteWeightNumericValue = dto.totalByteWeightNumericValue;
  entity.totalByteWeightNumericUnit = dto.totalByteWeightNumericUnit;
  entity.totalByteWeightItemsUrl = dto.totalByteWeightItemsUrl;
  entity.totalByteWeightItemsTotalBytes = dto.totalByteWeightItemsTotalBytes;

  // Total Blocking Time Data
  entity.totalBlockingTimeScore = dto.totalBlockingTimeScore;
  entity.totalBlockingTimeDisplayValue = dto.totalBlockingTimeDisplayValue;
  entity.totalBlockingTimeNumericValue = dto.totalBlockingTimeNumericValue;
  entity.totalBlockingTimeNumericUnit = dto.totalBlockingTimeNumericUnit;

  // Time To Interactive Data
  entity.timeToInteractiveScore = dto.timeToInteractiveScore;
  entity.timeToInteractiveDisplayValue = dto.timeToInteractiveDisplayValue;
  entity.timeToInteractiveNumericValue = dto.timeToInteractiveNumericValue;
  entity.timeToInteractiveNumericUnit = dto.timeToInteractiveNumericUnit;

  // DOM Size Data
  entity.domSizeScore = dto.domSizeScore;
  entity.domSizeDisplayValue = dto.domSizeDisplayValue;
  entity.domSizeNumericValue = dto.domSizeNumericValue;
  entity.domSizeNumericUnit = dto.domSizeNumericUnit;

  return entity;
}
