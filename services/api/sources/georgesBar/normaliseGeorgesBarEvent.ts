import { ComEvent, Sources } from '../../../events/types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { EvtBrtSeriesDataRaw } from '../common/eventbrite/types';

export const getGeorgesBarId = (ce: EvtBrtSeriesDataRaw) => getEventbriteEvtId(`GRB`, ce)

const normaliseGeorgesBarEvent = (ce: EvtBrtSeriesDataRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('GRB', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.GENERATED_GEORGES_BAR,
    venueName: 'Georges Bar, Fitzroy',
  });
}

export default normaliseGeorgesBarEvent;
