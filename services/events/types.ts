export type ComEventSummary = {
  title: string,
  subTitle?: string,
  timestamp: number,
  venue: {
    name: string,
    slug?: string,
  },
  imgSrc?: string,
  tags?: string[],
}

export type ComEvent = ComEventSummary & {
  description?: string,
  orderLink: string,
}
