export type EventSummary = {
  title: string,
  venue: {
    name: string,
    slug?: string,
  },
  imgSrc?: string,
  tags?: string[],
}

export type Event = EventSummary & {
  description?: string,
  orderLink: string,
}
