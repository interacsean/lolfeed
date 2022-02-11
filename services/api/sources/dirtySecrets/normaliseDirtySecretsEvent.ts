import { ComEvent, Sources } from '../../../events/types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { EvtBrtSeriesDataRaw } from '../common/eventbrite/types';

export const getDirtySecretsId = (ce: EvtBrtSeriesDataRaw) => getEventbriteEvtId('DTS', ce)

const normaliseDirtySecretsEvent = (ce: EvtBrtSeriesDataRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('DTS', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.DIRTY_SECRETS,
    venueName: 'Caz Reitop\'s Dirty Secrets',
  });
}

export default normaliseDirtySecretsEvent;
