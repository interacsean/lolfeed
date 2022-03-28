import { Tags } from './tags/tags';

export type ComEventSummary = {
  uid: string;
  title: string;
  subTitle?: string;
  timestamp: [number] | [number, number];
  timestampPrecision: TimestampPrecision;
  timezone: string;
  venueName?: string;
  venueSlug?: string;
  imgSrc?: string;
  tags?: Tags[];
  price?:
    | null
    | number
    | [number]
    | [number, string]
    | [number, number]
    | [number, number, string];
  description?: string;
  orderLink?: string | null;
  source: Sources;
  approval: EvtApproval;
  comicsHeadline?: string[];
  comicsSupport?: string[];
  comicsFeatured?: string[];
};

export type ComEvent = ComEventSummary & {
  writeup?: string;
};

export enum TimestampPrecision {
  TIME = 'TIME',
  DAY = 'DAY',
}

export enum Sources {
  RUBBER_CHICKEN = 'RUBBER_CHICKEN',
  BOBBIE_PEELS = 'BOBBIE_PEELS',
  COMEDY_IN_THE_CELLAR = 'COMEDY_IN_THE_CELLAR',
  COMICS_LOUNGE = 'COMICS_LOUNGE',
  COMEDY_REPUBLIC = 'COMEDY_REPUBLIC',
  COOPERS_INN = 'COOPERS_INN',
  DIRTY_SECRETS = 'DIRTY_SECRETS',
  GASO = 'GASO',
  GEORGES_BAR = 'GEORGES_BAR',
  LANTERN = 'LANTERN',
  LIMBO_VOLTAIRE = 'LIMBO_VOLTAIRE',
  RAISE_THE_BAR = 'RAISE_THE_BAR',
  ROCHEY = 'ROCHEY',
  VOLTAIRE = 'VOLTAIRE',
  GENERAL = 'GENERAL',
  GENERATED_BOBBY_PEELS = 'GENERATED_BOBBY_PEELS',
  GENERATED_GEORGES_BAR = 'GENERATED_GEORGES_BAR',
  GENERATED_GUERILLA_RESISTANCE = 'GENERATED_GUERILLA_RESISTANCE',
  GENERATED_HIGHLANDER = 'GENERATED_HIGHLANDER',
  GENERATED_LAUGHS_AT_LANTERN = 'GENERATED_LAUGHS_AT_LANTERN',
  GENERATED_VOLTAIRE = 'GENERATED_VOLTAIRE',
  GENERATED_DIRTY_SECRETS = 'GENERATED_DIRTY_SECRETS',
  GENERATED_GENERAL = 'GENERATED_GENERAL',
  GENERATED_RED_BETTY = 'GENERATED_RED_BETTY',
}

export enum EvtApproval {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED_WITH_TRUST = 'APPROVED_WITH_TRUST',
  APPROVED_MANUALLY = 'APPROVED_MANUALLY',
  REJECTED = 'REJECTED',
  REJECTED_BY_RULE = 'REJECTED_BY_RULE',
}

export const defaultEvtApproval = EvtApproval.APPROVED_WITH_TRUST;
