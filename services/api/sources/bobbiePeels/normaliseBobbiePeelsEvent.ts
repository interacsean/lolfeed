import { ComEvent, Sources } from '../../../events/types';
import { EvtBrtEvtRaw } from '../common/types';
import getNormalisedEventbriteEvent from '../common/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/getEventbriteEvtId';

export const getBobbiePeelsId = (ce: EvtBrtEvtRaw) => getEventbriteEvtId('BBP', ce)

const normaliseBobbiePeelsEvent = (ce: EvtBrtEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('BBP', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.BOBBIE_PEELS,
    venueName: 'Bobbie Peels',
  });
}

export default normaliseBobbiePeelsEvent;
