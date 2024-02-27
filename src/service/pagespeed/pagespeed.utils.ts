import { Website } from '../website/entities/website.entity';
import { CreatePageSpeedDto } from './dto/create-pagespeed.dto';
import { PageSpeedData } from './entities/pagespeeddata.entity';

export function createPageSpeedDTOFromApiResponse(
  data: any,
): CreatePageSpeedDto {
  const pageSpeedDTO = new CreatePageSpeedDto();

  // Datas from pagespeed request
  const mainLighthouseObjet = data.lighthouseResult;
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
  const totalByteWeightData = data.lighthouseResult.audits['total-byte-weight'];
  const totalBlockingTimeData =
    data.lighthouseResult.audits['total-blocking-time'];
  const timeToInteractiveData = data.lighthouseResult.audits['interactive'];
  const domSizeData = data.lighthouseResult.audits['dom-size'];
  const largestContentfulPaintData =
    data.lighthouseResult.audits['largest-contentful-paint'];
  const unusedJavaScript = data.lighthouseResult.audits['unused-javascript'];

  // Save howl object
  pageSpeedDTO.lighthouseObject = mainLighthouseObjet;

  // First Contentful Paint Data
  pageSpeedDTO.firstContentfulPaintScore = firstContentfulPaintData.score;
  pageSpeedDTO.firstContentfulPaintNumericValue =
    firstContentfulPaintData.numericUnit;
  pageSpeedDTO.firstContentfulPaintNumericValue =
    firstContentfulPaintData.numericValue;
  pageSpeedDTO.firstContentfulPaintDisplayValue =
    firstContentfulPaintData.displayValue;

  // First Meaningful Paint Data
  pageSpeedDTO.firstMeaningfulPaintScore = firstMeaningfulPaintData.score;
  pageSpeedDTO.firstMeaningfulPaintNumericValue =
    firstMeaningfulPaintData.numericValue;
  pageSpeedDTO.firstMeaningfulPaintNumericUnit =
    firstMeaningfulPaintData.numericUnit;
  pageSpeedDTO.firstMeaningfulPaintDisplayValue =
    firstMeaningfulPaintData.displayValue;

  // Main Thread Work Breakdown Data
  pageSpeedDTO.mainThreadWorkBreakdownDisplayValue =
    mainThreadWorkBreakdownData.displayValue;
  pageSpeedDTO.mainThreadWorkBreakdownNumricValue =
    mainThreadWorkBreakdownData.numericValue;
  pageSpeedDTO.mainThreadWorkBreakdownNumericUnit =
    mainThreadWorkBreakdownData.numericUnit;
  pageSpeedDTO.mainThreadWorkBreakdownItemsDuration = [];
  const items = mainThreadWorkBreakdownData.details.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    pageSpeedDTO.mainThreadWorkBreakdownItemsDuration.push(item.duration);
  }
  pageSpeedDTO.mainThreadWorkBreakdownItemsGroupLabel = [];
  const group = mainThreadWorkBreakdownData.details.items;
  for (let i = 0; i < group.length; i++) {
    const item = group[i];
    pageSpeedDTO.mainThreadWorkBreakdownItemsGroupLabel.push(item.groupLabel);
  }
  // Largest Contentful Paint Data
  pageSpeedDTO.largestContentfulPaintScore = largestContentfulPaintData.score;
  pageSpeedDTO.largestContentfulPaintDisplayValue =
    largestContentfulPaintData.displayValue;
  pageSpeedDTO.largestContentfulPaintNumericValue =
    largestContentfulPaintData.numericValue;
  pageSpeedDTO.largestContentfulPaintNumericUnit =
    largestContentfulPaintData.numericUnit;

  // Unused CSS Rules Data
  if (unusedCssRulesData && unusedCssRulesData.details) {
    pageSpeedDTO.unusedCssRulesItems = [];
    const cssdata = unusedCssRulesData.details.items;
    for (let i = 0; i < cssdata.length; i++) {
      const item = cssdata[i];
      pageSpeedDTO.unusedCssRulesItems.push(item);
    }
  }
  // Unused JavaScript
  if (unusedJavaScript && unusedJavaScript.details) {
    pageSpeedDTO.unusedJavaScript = [];
    const javadata = unusedJavaScript.details.items;
    for (let i = 0; i < javadata.length; i++) {
      const item = javadata[i];
      pageSpeedDTO.unusedJavaScript.push(item);
    }
  }
  // Speed Index Data
  pageSpeedDTO.speedIndexScore = speedIndexData.score;
  pageSpeedDTO.speedIndexDisplayValue = speedIndexData.displayValue;
  pageSpeedDTO.speedIndexNumericValue = speedIndexData.numericValue;
  pageSpeedDTO.speedIndexNumericUnit = speedIndexData.numericUnit;

  // Third Party Summary Data
  pageSpeedDTO.thirdPartySummaryDisplayValue =
    thirdPartySummaryData.displayValue;
  // Third Party Summary Url
  if (
    thirdPartySummaryData &&
    thirdPartySummaryData.detail &&
    thirdPartySummaryData.detail.items
  ) {
    pageSpeedDTO.thirdPartySummaryItemsUrl = [];
    for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
      const item = thirdPartySummaryData.details.items[i];
      for (let j = 0; j < item.subItems.items.length; j++) {
        const subItem = item.subItems.items[j];
        pageSpeedDTO.thirdPartySummaryItemsUrl.push(subItem.url);
      }
    }
  }
  // Third Party Summary Transfer Size
  if (
    thirdPartySummaryData &&
    thirdPartySummaryData.details &&
    thirdPartySummaryData.details.items
  ) {
    pageSpeedDTO.thirdPartySummaryItemsTransfer = [];
    for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
      const item = thirdPartySummaryData.details.items[i];
      for (let j = 0; j < item.subItems.items.length; j++) {
        const subItem = item.subItems.items[j];
        pageSpeedDTO.thirdPartySummaryItemsTransfer.push(subItem.transferSize);
      }
    }
  }
  // Third Party Summary Main Thread Time
  if (
    thirdPartySummaryData &&
    thirdPartySummaryData.details &&
    thirdPartySummaryData.details.items
  ) {
    pageSpeedDTO.thirdPartySummaryItemsMainThred = [];
    for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
      const item = thirdPartySummaryData.details.items[i];
      for (let j = 0; j < item.subItems.items.length; j++) {
        const subItem = item.subItems.items[j];
        pageSpeedDTO.thirdPartySummaryItemsMainThred.push(
          subItem.mainThreadTime,
        );
      }
    }
  }
  // Third Party Summary Blocking Time
  if (
    thirdPartySummaryData &&
    thirdPartySummaryData.details &&
    thirdPartySummaryData.details.items
  ) {
    pageSpeedDTO.thirdPartySummaryItemsBlockingTime = [];
    for (let i = 0; i < thirdPartySummaryData.details.items.length; i++) {
      const item = thirdPartySummaryData.details.items[i];
      for (let j = 0; j < item.subItems.items.length; j++) {
        const subItem = item.subItems.items[j];
        pageSpeedDTO.thirdPartySummaryItemsBlockingTime.push(
          subItem.blockingTime,
        );
      }
    }
  }

  // Total Byte Weight Data
  pageSpeedDTO.totalByteWeightScore = totalByteWeightData.score;
  pageSpeedDTO.totalByteWeightDisplayValue = totalByteWeightData.displayValue;
  pageSpeedDTO.totalByteWeightNumericValue = totalByteWeightData.numericValue;
  pageSpeedDTO.totalByteWeightNumericUnit = totalByteWeightData.numericUnit;
  pageSpeedDTO.totalByteWeightItemsUrl = [];
  const byteUrl = totalByteWeightData.details.items;
  for (let i = 0; i < byteUrl.length; i++) {
    const item = byteUrl[i];
    pageSpeedDTO.totalByteWeightItemsUrl.push(item.url);
  }
  pageSpeedDTO.totalByteWeightItemsTotalBytes = [];
  const totalByte = totalByteWeightData.details.items;
  for (let i = 0; i < totalByte.length; i++) {
    const item = totalByte[i];
    pageSpeedDTO.totalByteWeightItemsUrl.push(item.url);
  }

  // Total Blocking Time Data
  pageSpeedDTO.totalBlockingTimeScore = totalBlockingTimeData.score;
  pageSpeedDTO.totalBlockingTimeDisplayValue =
    totalBlockingTimeData.displayValue;
  pageSpeedDTO.totalBlockingTimeNumericValue =
    totalBlockingTimeData.numericValue;
  pageSpeedDTO.totalBlockingTimeNumericUnit = totalBlockingTimeData.numericUnit;

  // Time To Interactive Data
  pageSpeedDTO.timeToInteractiveScore = timeToInteractiveData.score;
  pageSpeedDTO.timeToInteractiveDisplayValue =
    timeToInteractiveData.displayValue;
  pageSpeedDTO.timeToInteractiveNumericValue =
    timeToInteractiveData.numericValue;
  pageSpeedDTO.timeToInteractiveNumericUnit = timeToInteractiveData.numericUnit;

  // DOM Size Data
  pageSpeedDTO.domSizeScore = domSizeData.score;
  pageSpeedDTO.domSizeDisplayValue = domSizeData.displayValue;
  pageSpeedDTO.domSizeNumericValue = domSizeData.numericValue;
  pageSpeedDTO.domSizeNumericUnit = domSizeData.numericUnit;

  return pageSpeedDTO;
}

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

  // Unused Java Script Data
  entity.unusedJavaScript = dto.unusedJavaScript;

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
