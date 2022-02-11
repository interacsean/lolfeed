import { ComEvent, Sources } from '../../../events/types';
import { EvtBrtEvtRaw } from '../common/types';
import getNormalisedEventbriteEvent from '../common/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/getEventbriteEvtId';

export const getGeorgesBarId = (ce: EvtBrtEvtRaw) => getEventbriteEvtId(`GRB`, ce)

const normaliseGeorgesBarEvent = (ce: EvtBrtEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('GRB', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.GENERATED_GEORGES_BAR,
    venueName: 'Georges Bar, Fitzroy',
  });
}

export default normaliseGeorgesBarEvent;
