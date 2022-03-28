import { ComEvent, Sources } from '../../../../../domain/events/types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { LafLntEvtRaw } from './types';

export const getLanternId = (ce: LafLntEvtRaw) => getEventbriteEvtId('LNT', ce);

const normaliseLanternEvent = (ce: LafLntEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('LNT', ce);

  if (!rest) return null;
  return {
    ...rest,
    source: Sources.LANTERN,
    venueName: 'Lantern Lounge',
  };
};

export default normaliseLanternEvent;
