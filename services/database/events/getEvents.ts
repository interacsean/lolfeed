import { compose, isEmpty, not } from 'ramda';
import eventsCollection from './events';
import { EvtRecord } from './types';

// todo: only get events in near future
const getEvents = () =>
  eventsCollection.get().then((ds) => {
    return ds.docs
      .map((snap) => snap.data())
      .filter(compose(not, isEmpty)) as EvtRecord[];
  });

export default getEvents;
