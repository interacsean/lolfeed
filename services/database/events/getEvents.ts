import { compose, not, isEmpty, mergeDeepLeft } from 'ramda';

import eventsCollection from './events';
import { EvtRecord } from './types';

// todo: only get events in next little while
const getEvents = () => eventsCollection.get().then(
  ds => {
    return ds.docs
      .map(snap => {
        const data = snap.data();
        console.log(data);
        return data;
      })
      .filter(compose(not, isEmpty)) as EvtRecord[];
  }
);

export default getEvents;
