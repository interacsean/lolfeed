import { EvtBrtEvtRaw } from './types';
import getEventbriteEvtId from './getEventbriteEvtId';
import extractEventbriteEvtTime from './extractEventbriteEvtTime';
import { TimestampPrecision } from '../../../events/types';

const getNormalisedEventbriteEvent = (idPrefix: string, ce: EvtBrtEvtRaw) => {
  const uid = getEventbriteEvtId(idPrefix, ce);
  const timestamp = extractEventbriteEvtTime(ce);

  if (!uid || !timestamp) return null;

  return {
    uid,
    title: ce.name,
    // subTitle: ce.subTitle,
    timezone: 'Australia/Melbourne',
    timestamp,
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: ce.url,
    ...ce.image && { imgSrc: ce.image },
    price: ce.offers.lowPrice ? [
      parseFloat(ce.offers.lowPrice),
      ...ce.offers.highPrice && parseFloat(ce.offers.highPrice) ? [parseFloat(ce.offers.highPrice)] : []
    ] as [number, number] : null,
  }
};

export default getNormalisedEventbriteEvent;
