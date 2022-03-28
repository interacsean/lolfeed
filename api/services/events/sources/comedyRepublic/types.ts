import { EvtRaw } from '../types';

export type ComRepGuestToken = {
  Token: string;
  TokenExpiryTime: number;
  GuestId: string;
  SessionId: string;
  UIVersion: string;
};
export type ComRepGuestTokenResponse = {
  Errors: any;
  Result: {
    GuestToken: ComRepGuestToken;
  };
};
export interface ComRepEvtRaw extends EvtRaw {
  EventId: number;
  EventLine1: string;
  EventLine2: string;
  Description: string;
  EventStatusDesc: null;
  EventStartDate: string;
  EventEndDate: string;
  PriceRangeStart: number;
  EventInfo: null;
  PriceRangeEnd: number;
  VenueId: number;
  IsSoldOut: boolean;
  VenueName: string;
  VenueSuburb: string;
  EventVenueTypeDesc: string;
  DefaultImagePath: null | string;
  ModuleType: string;
  EventTypeDesc: null | string;
  EventType: number;
  SessionCount: number;
  ProductTypes: null;
  isAvialable: boolean;
  VideoURL: null | string;
  EventStatus: null | string;
  EventMessage: null | string;
  IsExhusted: boolean;
  WaitListId: number;
  IsFeaturedEvent: boolean;
  IsActiveWaitList: boolean;
  IsJoinWaitListShow: boolean;
  EventSoldOutStatus: null | string;
  EventSoldOutMessage: null | string;
  IsHiddenInSales: null | string;
}

export type ComRepEvtResponse = {
  Errors: any;
  Result: {
    RecordCount: number;
    SalesEventDetails: ComRepEvtRaw[];
  };
};
