export type ComEventSummary = {
  uid: string;
  title: string,
  subTitle?: string,
  timestamp: number[],
  timestampPrecision: TimestampPrecision,
  venue: {
    name: string,
    slug?: string,
  },
  imgSrc?: string,
  tags?: string[],
  price?: number,
}

export type ComEvent = ComEventSummary & {
  description?: string,
  orderLink: string,
}

export enum TimestampPrecision {
  TIME = 'TIME',
  DAY = 'DAY',
  DAY_RANGE = 'DAY_RANGE',
}