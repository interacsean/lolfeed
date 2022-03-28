import eventsCollection from './events';

const getEventRecord = (id: string) => {
  return eventsCollection
    .doc(id)
    .get()
    .then((rec) => {
      const data = rec.data();
      return data || null;
    });
};

export default getEventRecord;
