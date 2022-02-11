export type ComEventSummary = {
  uid: string;
  title: string,
  subTitle?: string,
  timestamp: [number] | [number, number],
  timestampPrecision: TimestampPrecision,
  timezone: string,
  venueName: string,
  venueSlug?: string,
  imgSrc?: string,
  tags?: string[],
  price?:
    | null
    | number
    | [number]
    | [number, string]
    | [number, number]
    | [number, number, string],
  description?: string,
  orderLink?: string | null,
  source: Sources,
}

export type ComEvent = ComEventSummary & {
  writeup?: string,
}

export enum TimestampPrecision {
  TIME = 'TIME',
  DAY = 'DAY',
}

export enum Sources {
  RUBBER_CHICKEN = 'RUBBER_CHICKEN',
  BOBBIE_PEELS = 'BOBBIE_PEELS',
  COMICS_LOUNGE = 'COMICS_LOUNGE',
  COMEDY_REPUBLIC = 'COMEDY_REPUBLIC',
  DIRTY_SECRETS = 'DIRTY_SECRETS',
  GEORGES_BAR = 'GEORGES_BAR',
  ROCHEY = 'ROCHEY',
  GENERATED_BOBBY_PEELS = 'GENERATED_BOBBY_PEELS',
  GENERATED_GEORGES_BAR = 'GENERATED_GEORGES_BAR',
  GENERATED_GUERILLA_RESISTANCE = 'GENERATED_GUERILLA_RESISTANCE',
  GENERATED_HIGHLANDER = 'GENERATED_HIGHLANDER',
  GENERATED_LAUGHS_AT_LANTERN = 'GENERATED_LAUGHS_AT_LANTERN',
  GENERATED_VOLTAIRE = 'GENERATED_VOLTAIRE',
  GENERATED_DIRTY_SECRETS = 'GENERATED_DIRTY_SECRETS',
  GENERATED_GENERAL = 'GENERATED_GENERAL',
}
