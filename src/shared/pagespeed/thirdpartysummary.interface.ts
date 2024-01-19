import type { IPagespeedTotalHeading } from './pagespeed.interface';

export interface IThirdPartySummary {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue: string;
  details: IThirdPartySummaryDetails;
}
export interface IThirdPartySummaryDetails {
  headings: IPagespeedTotalHeading[];
  items: IThirdPartySummaryDetailsItem[];
  type: string;
  isEntityGrouped: boolean;
  summary: IThirdPartySummaryDetailsSummary;
}
export interface IThirdPartySummaryDetailsSummary {
  wastedBytes?: number;
  wastedMs?: number;
  wastedPercent?: number;
  wastedBytesBreakdown?: IThirdPartySummaryDetailsSummaryWastedBytesBreakdown;
}
export interface IThirdPartySummaryDetailsSummaryWastedBytesBreakdown {
  items: IThirdPartySummaryDetailsSummaryWastedBytesBreakdownItem[];
  type: string;
}
export interface IThirdPartySummaryDetailsSummaryWastedBytesBreakdownItem {
  wastedBytes: number;
  entity: string;
}
export interface IThirdPartySummaryDetailsHeadingSubItemsHeading {
  key: string;
  itemType: string;
  text: string;
}
export interface IThirdPartySummaryDetailsItem {
  entity: string;
  transferSize: number;
  mainThreadTime: number;
  blockingTime: number;
  subItems: IThirdPartySummaryDetailsItemSubItem[];
}
export interface IThirdPartySummaryDetailsItemSubItem {
  items: IThirdPartySummaryDetailsItemSubItemItem;
  type: string;
}
export interface IThirdPartySummaryDetailsItemSubItemItem {
  transferSize: number;
  blockingTime: number;
  mainThreadTime: number;
  url: string;
  tbtImpact: number;
}
