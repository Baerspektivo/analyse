export interface IMainThreadWorkBreakdown {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue: string;
  details: IMainThreadWorkBreakdownDetails;
}
export interface IMainThreadWorkBreakdownDetails {
  headings: IMainThreadWorkBreakdownDetailsHeading[];
  sortedBy: string[];
  type: string;
  items: IMainThreadWorkBreakdownDetailsItem[];
}
export interface IMainThreadWorkBreakdownDetailsHeading {
  lable: string;
  key: string;
  valueType: string;
  granularity?: number;
}
export interface IMainThreadWorkBreakdownDetailsItem {
  groupLable: string;
  group: string;
  duration: number;
}
