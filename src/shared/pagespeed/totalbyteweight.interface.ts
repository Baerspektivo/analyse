import type { IPagespeedTotalHeading } from './pagespeed.interface';

export interface ITotalByteWeigth {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue: string;
  details: ITotalByteWeightDetails;
  numericValue: number;
  numericUnit: string;
}
export interface ITotalByteWeightDetails {
  sortedBy: string[];
  headings: IPagespeedTotalHeading[];
  type: string;
  items: ITotalByteWeightDetailsItem[];
}
export interface ITotalByteWeightDetailsItem {
  url: string;
  totalBytes: number;
}
