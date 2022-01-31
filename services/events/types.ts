export type ComEventSummary = {
  uid: string;
  title: string,
  subTitle?: string,
  timestamp: number[],
  timestampPrecision: TimestampPrecision,
  venueName: string,
  venueSlug?: string,
  imgSrc?: string,
  tags?: string[],
  price?:
    | null
    | number
    | [number]
    | [number, string]
    | [number, number, string],
  description?: string,
}

export type ComEvent = ComEventSummary & {
  source: Sources,
  orderLink?: string | null,
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
  GENERATED_GUERILLA_RESISTANCE = 'GENERATED_GUERILLA_RESISTANCE',
  GENERATED_HIGHLANDER = 'GENERATED_HIGHLANDER',
  GENERATED_LAUGHS_AT_LANTERN = 'GENERATED_LAUGHS_AT_LANTERN',
  GENERATED_VOLTAIRE = 'GENERATED_VOLTAIRE',
  GENERATED_DIRTY_SECRETS = 'GENERATED_DIRTY_SECRETS',
  GENERATED_GENERAL = 'GENERATED_GENERAL',
}
