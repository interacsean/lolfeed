import { EvtRecord } from './types';
import eventsCollection from './events';

const upsertEvent = (uid: string, evt: Partial<EvtRecord>) => {
  return eventsCollection.doc(uid).set(evt, { merge: true });
};

export default upsertEvent;
