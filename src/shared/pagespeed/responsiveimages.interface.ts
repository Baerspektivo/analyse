import type { IPagespeedTotalHeading } from './pagespeed.interface';

export interface IResonsiveImages {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  details: IResonsiveImagesDetails;
  numericValue: number;
  numericUnit: string;
}
export interface IResonsiveImagesDetails {
  headings?: IPagespeedTotalHeading;
  items?: IResonsiveImagesDetailsItem[];
  type: string;
  debugData?: IResonsiveImagesDetailsDebugData;
  overallSavingsMs: number;
  sortedBy: string[];
}
export interface IResonsiveImagesDetailsDebugData {
  metricSavings: IResonsiveImagesDetailsDebugDataMetricSavings[];
  type: string;
}
export interface IResonsiveImagesDetailsDebugDataMetricSavings {
  FCP: number;
  LCP: number;
}
export interface IResonsiveImagesDetailsItem {
  url: string;
}
