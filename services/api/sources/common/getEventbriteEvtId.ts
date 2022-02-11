import { EvtBrtEvtRaw } from './types';

const getEventbriteEvtId = (idPrefix: string, event: EvtBrtEvtRaw) => {
  const id = event.url.match(/-(\d+)([^-]*|)$/)?.[1] || null;
  return id && `${idPrefix}-${id}`;
}

export default getEventbriteEvtId;
