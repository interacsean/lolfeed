import getEventbriteEvtId from './getEventbriteEvtId';
import extractEventbriteEvtTime from './extractEventbriteEvtTime';
import {
  ComEvent,
  defaultEvtApproval,
  TimestampPrecision,
} from '../../../types';
import {
  EvtBrtEvtRaw,
  EvtBrtIndividualEvtDetailRaw,
  EvtBrtSeriesDataRaw,
} from './types';

const getNormalisedEventbriteIndividualEvent = (
  idPrefix: string,
  ev: EvtBrtEvtRaw & { individualEventData: EvtBrtIndividualEvtDetailRaw },
): Omit<ComEvent, 'source' | 'uid'> | null => {
  return {
    title: ev.individualEventData.name.text,
    timezone: ev.individualEventData.start.timezone,
    ...(ev.individualEventData.description.text && {
      description: ev.individualEventData.description.text,
    }),
    timestamp: [
      new Date(ev.individualEventData.start.local).getTime(),
      ...(ev.individualEventData.end
        ? [new Date(ev.individualEventData.end.local).getTime()]
        : []),
    ] as [number, number],
    venueName: ev.individualEventData.venue.name,
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: ev.individualEventData.url,
    ...(ev.individualEventData.logo.url && {
      imgSrc: ev.individualEventData.logo.url,
    }),
    approval: defaultEvtApproval,
  };
};

const getNormalisedEventbriteTopLevelEvent = (
  idPrefix: string,
  ev: EvtBrtSeriesDataRaw,
): Omit<ComEvent, 'source' | 'uid'> | null => {
  const timestamp = extractEventbriteEvtTime(ev);

  if (!timestamp) return null;

  return {
    title: ev.name,
    timezone: 'Australia/Melbourne',
    timestamp,
    venueName: '',
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: ev.url,
    ...(ev.image && { imgSrc: ev.image }),
    price: ev.offers.lowPrice
      ? ([
          parseFloat(ev.offers.lowPrice),
          ...(ev.offers.highPrice && parseFloat(ev.offers.highPrice)
            ? [parseFloat(ev.offers.highPrice)]
            : []),
        ] as [number, number])
      : null,
    approval: defaultEvtApproval,
  };
};

const getNormalisedEventbriteEvent = (
  idPrefix: string,
  ev: EvtBrtEvtRaw,
): Omit<ComEvent, 'source'> | null => {
  const uid = getEventbriteEvtId(idPrefix, ev);
  const rest = ev.individualEventData
    ? // @ts-ignore just checked
      getNormalisedEventbriteIndividualEvent(idPrefix, ev)
    : getNormalisedEventbriteTopLevelEvent(idPrefix, ev.seriesData);
  if (!uid || !rest) return null;
  return {
    uid,
    ...rest,
  };
};

export default getNormalisedEventbriteEvent;
