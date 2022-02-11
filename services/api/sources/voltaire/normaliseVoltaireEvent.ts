import { ComEvent, Sources } from '../../../events/types';
import { EvtBrtEvtRaw } from '../common/types';
import getPartialNormalisedEventbriteEvent from '../common/getPartialNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/getEventbriteEvtId';

export const getVoltaireId = (ce: EvtBrtEvtRaw) => getEventbriteEvtId('VLT', ce)

const normaliseVoltaireEvent = (ce: EvtBrtEvtRaw): ComEvent | null => {
  const rest = getPartialNormalisedEventbriteEvent('VLT', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.VOLTAIRE,
    venueName: 'Voltaire',
  });
}

export default normaliseVoltaireEvent;
