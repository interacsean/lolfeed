import { ComEvent, Sources } from '../../../events/types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { EvtBrtEvtRaw } from '../common/eventbrite/types';

export const getGeorgesBarId = (ce: EvtBrtEvtRaw) =>
  getEventbriteEvtId(`GRB`, ce);

const normaliseGeorgesBarEvent = (ce: EvtBrtEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('GRB', ce);

  if (!rest) return null;
  return {
    ...rest,
    source: Sources.GENERATED_GEORGES_BAR,
    venueName: 'Georges Bar, Fitzroy',
  };
};

export default normaliseGeorgesBarEvent;
