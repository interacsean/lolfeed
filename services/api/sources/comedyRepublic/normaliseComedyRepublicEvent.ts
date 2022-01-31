import { ComRepEvtRaw } from './types';
import { ComEvent, Sources, TimestampPrecision } from '../../../events/types';
import { compose, isEmpty, not } from 'ramda';
import { parseFromTimeZone } from 'date-fns-timezone';

const convertTime = (dateTime: string) => {
  return parseFromTimeZone(dateTime, { timeZone: 'Australia/Melbourne' }).getTime()
}

export const getComedyRepublicId = (event: ComRepEvtRaw) => `CRP-${event.EventId}`

const normaliseComedyRepublicEvent = (cre: ComRepEvtRaw): ComEvent => ({
  uid: getComedyRepublicId(cre),
  source: Sources.COMEDY_REPUBLIC,
  title: cre.EventLine1,
  ...cre.EventLine2 && { subTitle: cre.EventLine2 },
  ...cre.Description && { description: cre.Description },
  venueName: [cre.VenueName, cre.VenueSuburb].filter(compose(not, isEmpty)).join(', '),
  timestamp: [
    convertTime(cre.EventStartDate),
    ...(cre.EventEndDate && cre.EventStartDate !== cre.EventEndDate ? [convertTime(cre.EventEndDate)] : [])
  ],
  timestampPrecision: cre.EventEndDate
    ? TimestampPrecision.DAY_RANGE
    : TimestampPrecision.TIME,
  orderLink: `https://tccinc.sales.ticketsearch.com/sales/salesevent/${cre.EventId}`,
  price: cre.PriceRangeStart || null,
  ...cre.DefaultImagePath && { imgSrc: cre.DefaultImagePath },
  // save original datas
});

export default normaliseComedyRepublicEvent;
