import { ComEvent, Sources } from '../../types';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import { EvtBrtEvtRaw } from '../common/eventbrite/types';

export const getDirtySecretsId = (ce: EvtBrtEvtRaw) =>
  getEventbriteEvtId('DTS', ce);

const normaliseDirtySecretsEvent = (ce: EvtBrtEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('DTS', ce);

  if (!rest) return null;
  return {
    ...rest,
    source: Sources.DIRTY_SECRETS,
    venueName: "Caz Reitop's Dirty Secrets",
  };
};

export default normaliseDirtySecretsEvent;
