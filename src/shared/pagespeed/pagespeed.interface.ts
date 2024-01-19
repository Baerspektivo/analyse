import type { IMainThreadWorkBreakdown } from './mainthreadworkbreakdown.interface';
import type { ITotalByteWeigth } from './totalbyteweight.interface';
import type { IThirdPartySummary } from './thirdpartysummary.interface';
import type { ICriticalRequestChains } from './criticalrequestchains.interface';

export interface IPageSpeedData {
  id: string;
  lightHouseMetrics: ILigthHouseMetrics;
}

export interface ILigthHouseMetrics {
  'third-party-summary': IThirdPartySummary;
  'total-byte-weight': ITotalByteWeigth;
  'unused-css-rules': string[];
  'mainthread-work-breakdown': IMainThreadWorkBreakdown;
  'critical-request-chains': ICriticalRequestChains;
}
export interface IPagespeedTotalHeading {
  lable: string;
  key: string;
  valueType: string;
  granularity?: number;
  subItemsHeading: IPagespeedTotalHeadingSubItemsHeading[];
}
export interface IPagespeedTotalHeadingSubItemsHeading {
  key: string;
  itemType: string;
  text: string;
}
