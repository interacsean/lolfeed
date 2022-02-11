import getTryBookingEvtId from './getTryBookingEvtId';
import { ComEvent, Sources, TimestampPrecision } from '../../../../events/types';
import { TryBkgEvtRaw } from './types';

const getNormalisedTryBookingEvent = (
  eid: string,
  idPrefix: string,
  ev: TryBkgEvtRaw,
): ComEvent | null => {
  const uid = getTryBookingEvtId(idPrefix, ev);
  // const timestamp = extractTryBookingEvtTime(ev);

  if (!uid) return null;

  return {
    uid,
    title: ev.eventName,
    venueName: 'Rochey',
    source: Sources.ROCHEY,
    // subTitle: ev.subTitle,
    timezone: 'Australia/Melbourne',
    timestamp: [1],
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: `https://www.trybooking.com/events/${eid}/sessions/${ev.orderEdid}/sections/${ev.orderAid}/tickets`,
    imgSrc: ev.imgSrc || undefined,
  }
};

export default getNormalisedTryBookingEvent;
