import { ComEvent, Sources } from '../../../../../domain/events/types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { VltEvtRaw } from './types';

export const getVoltaireId = (ce: VltEvtRaw) => getEventbriteEvtId('VLT', ce);

const normaliseVoltaireEvent = (ce: VltEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('VLT', ce);

  if (!rest) return null;
  return {
    ...rest,
    source: Sources.VOLTAIRE,
    venueName: 'Voltaire',
  };
};

export default normaliseVoltaireEvent;
