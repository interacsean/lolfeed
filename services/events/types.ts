export type ComEventSummary = {
  title: string,
  subTitle?: string,
  timestamp: number | null,
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
