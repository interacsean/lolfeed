import { ComRepEvtRaw } from './types';
import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../../events/types';
import { compose, isEmpty, not } from 'ramda';
import { parseFromTimeZone } from 'date-fns-timezone';

const convertTime = (dateTime: string) => {
  return parseFromTimeZone(dateTime, {
    timeZone: 'Australia/Melbourne',
  }).getTime();
};

export const getComedyRepublicId = (event: ComRepEvtRaw) =>
  `CRP-${event.EventId}`;

const normaliseComedyRepublicEvent = (cre: ComRepEvtRaw): ComEvent => ({
  uid: getComedyRepublicId(cre),
  source: Sources.COMEDY_REPUBLIC,
  title: cre.EventLine1,
  ...(cre.EventLine2 && { subTitle: cre.EventLine2 }),
  ...(cre.Description && { writeup: cre.Description }),
  venueName: [cre.VenueName, cre.VenueSuburb]
    .filter(compose(not, isEmpty))
    .join(', '),
  timestamp: [
    convertTime(cre.EventStartDate),
    ...(cre.EventEndDate && cre.EventStartDate !== cre.EventEndDate
      ? [convertTime(cre.EventEndDate)]
      : []),
  ] as [number, number],
  timestampPrecision: TimestampPrecision.TIME,
  timezone: 'Australia/Melbourne',
  orderLink: `https://tccinc.sales.ticketsearch.com/sales/salesevent/${cre.EventId}`,
  price: cre.PriceRangeStart || null,
  ...(cre.DefaultImagePath && { imgSrc: cre.DefaultImagePath }),
  approval: defaultEvtApproval,
});

export default normaliseComedyRepublicEvent;
