import { GrgBarEvtRaw } from './types';
import { ComEvent, Sources, TimestampPrecision } from '../../../events/types';
import { parseFromString } from 'date-fns-timezone';

export const getGeorgesBarId = (event: GrgBarEvtRaw) => {
  const id = event.url.match(/-(\d+)([^-]*|)$/)?.[1] || null;
  return id && `GRB-${id}`;
}

const extractTime = (ce: GrgBarEvtRaw) => {
  return [
    new Date(ce.startDate).getTime(),
    ...ce.endDate ? [new Date(ce.endDate).getTime()] : []
  ] as [number] | [number, number];
}

const normaliseGeorgesBarEvent = (ce: GrgBarEvtRaw): ComEvent | null => {
  const uid = getGeorgesBarId(ce);
  const timestamp = extractTime(ce);

  if (!uid || !timestamp) return null;
  return ({
    uid,
    source: Sources.GENERATED_GEORGES_BAR,
    title: ce.name,
    // subTitle: ce.subTitle,
    venueName: 'Georges Bar, Fitzroy',
    timezone: 'Australia/Melbourne',
    timestamp,
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: ce.url,
    ...ce.image && { imgSrc: ce.image },
    price: ce.offers.lowPrice ? [
      parseFloat(ce.offers.lowPrice),
      ...ce.offers.highPrice && parseFloat(ce.offers.highPrice) ? [parseFloat(ce.offers.highPrice)] : []
      ] as [number, number] : null,
  });
}

export default normaliseGeorgesBarEvent;
