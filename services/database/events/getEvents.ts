import { compose, not, isEmpty} from 'ramda';

import eventsCollection, { EvtRecord } from './events';

// todo: only get events in next little while
const getEvents = () => eventsCollection.get().then(
  ds => ds.docs
    .map(d => d.data())
    .filter(compose(not, isEmpty)) as EvtRecord[]
);

export default getEvents;
