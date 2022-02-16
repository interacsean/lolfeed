import { EvtBrtEvtRaw } from './types';

const getEventbriteEvtId = (idPrefix: string, event: EvtBrtEvtRaw) => {
  if (event.individualEventData) {
    return `${idPrefix}-i-${event.individualEventData.id}`;
  }
  const id = event.seriesData.url.match(/-(\d+)([^-]*|)$/)?.[1] || null;
  return id && `${idPrefix}-${id}`;
};

export default getEventbriteEvtId;
