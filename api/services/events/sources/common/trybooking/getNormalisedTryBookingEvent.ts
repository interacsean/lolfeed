import getTryBookingEvtId from './getTryBookingEvtId';
import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../../../../../domain/events/types';
import { TryBkgEvtRaw } from './types';
import extractTryBookingEvtTime from './extractTryBookingEvtTime';

const getNormalisedTryBookingEvent = (
  eid: string,
  idPrefix: string,
  ev: TryBkgEvtRaw,
): Omit<ComEvent, 'source'> | null => {
  const uid = getTryBookingEvtId(idPrefix, ev);
  const timestamp = extractTryBookingEvtTime(ev);

  if (!uid) return null;

  return {
    uid,
    title: ev.eventName,
    venueName: '',
    timezone: 'Australia/Melbourne',
    timestamp,
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: `https://www.trybooking.com/events/${eid}/sessions/${ev.orderEdid}/sections/${ev.orderAid}/tickets`,
    imgSrc: ev.imgSrc ? `https://www.trybooking.com${ev.imgSrc}` : undefined,
    approval: defaultEvtApproval,
  };
};

export default getNormalisedTryBookingEvent;
