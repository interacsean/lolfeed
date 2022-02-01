export type GrgBarEvtRaw = {
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

// export type GrgBarEvtScrapedRaw = {
//   titleCombined: string,
//   dateRaw: string,
//   location: string,
//   price: string,
//   imgSrc: string,
//   bookingLink: string,
// }
