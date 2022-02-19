import { ComEvent, Sources } from '../../types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { RsTBarEvtRaw } from './types';

export const getRaiseTheBarId = (ce: RsTBarEvtRaw) => getEventbriteEvtId('RTB', ce)

const normaliseRaiseTheBarEvent = (ce: RsTBarEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('RTB', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.RAISE_THE_BAR,
    venueName: 'Club Voltaire',
  });
}

export default normaliseRaiseTheBarEvent;
