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
  price?:
    | number
    | [number]
    | [number, string]
    | [number, number, string],
}

export type ComEvent = ComEventSummary & {
  source: string,
  description?: string,
  orderLink?: string,
}

export enum TimestampPrecision {
  TIME = 'TIME',
  DAY = 'DAY',
  DAY_RANGE = 'DAY_RANGE',
}

export enum Sources {
  RUBBER_CHICKEN = 'RUBBER_CHICKEN',
  COMICS_LOUNGE = 'COMICS_LOUNGE',
  COMEDY_REPUBLIC = 'COMEDY_REPUBLIC',
  GENERATED_BOBBY_PEELS = 'GENERATED_BOBBY_PEELS',
  GENERATED_GEORGES_BAR = 'GENERATED_GEORGES_BAR',
}
