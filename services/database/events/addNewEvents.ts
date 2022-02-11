import { FieldPath } from '@google-cloud/firestore';
import eventsCollection from './events';
import fillEventRecord from './fillEventRecord';
import getEventRecord from './getEventRecord';
import { RawEventAndInfo } from '../../api/sources/getRawEvents';

const addNewEvents = async (events: RawEventAndInfo[]) => {
  for(const e in events) {
    const { uid, ...event } = events[e];
    if (!uid) continue;

    const currRecord = await getEventRecord(uid);
    const processedEvent = fillEventRecord(event, currRecord);
    await eventsCollection.doc(uid)
      .set(processedEvent, !currRecord ? {} : {
        mergeFields: [
          'rawEvent',
          'source',
          'comEvent',
           new FieldPath('meta', 'parseTime'),
        ]
      });
  }
  return {};
}

export default addNewEvents;
