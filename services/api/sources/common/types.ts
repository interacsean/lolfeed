export type EvtBrtEvtRaw = {
  startDate: string,
  endDate: string,
  name: string,
  url: string,
  image: string,
  offers: {
    url?: string,
    lowPrice?: string,
    highPrice?: string,
    priceCurrency?: string,
  },
  location: {
    address: {},
    geo: {},
    name: string,
  },
  description: string,
}

export type TryBkgEvtRaw = {
  eventName: string,
  imgSrc: string,
  date: string,
  desc: string,
  orderAid: string,
  orderEdid: string,
}
