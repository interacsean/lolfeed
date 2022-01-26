import eventsCollection from './events';

// todo: only get events in next little while
const getEvents = () => eventsCollection.get().then(
  ds => ds.docs.map(d => ({
    uid: d.id,
    ...d.data(),
  }))
)

export default getEvents;
