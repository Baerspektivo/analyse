import type { IMainThreadWorkBreakdown } from './mainthreadworkbreakdown.interface';
import { ITotalByteWeigth } from './totalbyteweight.interface';

export interface IPageSpeedData {
  id: string;
  lightHouseMetrics: ILigthHouseMetrics;
}

export interface ILigthHouseMetrics {
  'third-party-summary': IThirdPartySummary[];
  'total-byte-weight': ITotalByteWeigth;
  'unused-css-rules': string[];
  'mainthread-work-breakdown': IMainThreadWorkBreakdown;
}
export interface IPagespeedTotalHeading {
  lable: string;
  key: string;
  valueType: string;
  granularity?: number;
}

export interface IThirdPartySummary {
  transferSize: number;
  mainThreadTime: number;
  blockingTime: number;
}
export interface INetwortkRequest {
  url: string;
  networRequestTime: number;
}
