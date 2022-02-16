export type EvtBrtSeriesDataRaw = {
  startDate: string;
  endDate: string;
  name: string;
  url: string;
  image: string;
  offers: {
    url?: string;
    lowPrice?: string;
    highPrice?: string;
    priceCurrency?: string;
  };
  location: {
    address: {};
    geo: {};
    name: string;
  };
  description: string;
};

export type EvtBrtIndividualEvtDetailRaw = {
  id: string;
  name: { text: string };
  description: { text: string };
  url: string;
  start: {
    timezone: string;
    local: string;
    utc: string;
  };
  end: {
    timezone: string;
    local: string;
    utc: string;
  };
  summary: string;
  venue: {
    //...
    name: string;
  };
  ticket_availability: {
    has_available_tickets: boolean;
    minimum_ticket_price: {
      currency: string;
      major_value: string;
      value: number;
      display: string;
    };
    maximum_ticket_price: {
      currency: string;
      major_value: string;
      value: number;
      display: string;
    };
    is_sold_out: boolean;
    start_sales_date: null | string;
    waitlist_available: boolean;
  };
  logo: {
    url?: string;
  };
};

export type EvtBrtEvtRaw = {
  seriesData: EvtBrtSeriesDataRaw;
  individualEventData: EvtBrtIndividualEvtDetailRaw | null;
};
