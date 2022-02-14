import { ComEvent, Sources } from '../../../events/types';
import { EvtBrtEvtRaw } from '../common/eventbrite/types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { LmbVltEvtRaw } from './types';

export const getLimboVoltaireId = (ce: LmbVltEvtRaw) => getEventbriteEvtId('LBV', ce)

const normaliseLimboVoltaireEvent = (ce: LmbVltEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('LBV', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.LIMBO_VOLTAIRE,
    venueName: 'Voltaire',
  });
}

export default normaliseLimboVoltaireEvent;
