import { ComEvent, Sources } from '../../../events/types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { EvtBrtSeriesDataRaw } from '../common/eventbrite/types';

export const getBobbiePeelsId = (ce: EvtBrtSeriesDataRaw) => getEventbriteEvtId('BBP', ce)

const normaliseBobbiePeelsEvent = (ce: EvtBrtSeriesDataRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('BBP', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.BOBBIE_PEELS,
    venueName: 'Bobbie Peels',
  });
}

export default normaliseBobbiePeelsEvent;
