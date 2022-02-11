import { FieldPath } from '@google-cloud/firestore';
import eventsCollection from './events';
import fillEventRecord from './fillEventRecord';
import getEventRecord from './getEventRecord';
import { RawEventAndInfo } from '../../api/sources/getRawEvents';
import normaliseMixedEvent from '../../api/sources/normaliseMixedEvent';

const addNewEvents = async (events: RawEventAndInfo[]) => {
  for(const e in events) {
    const { uid, ...event } = events[e];
    if (!uid) continue;

    const prelimNormEvent = normaliseMixedEvent(event);
    if (
      !prelimNormEvent ||
      (prelimNormEvent.timestamp[1] || prelimNormEvent.timestamp[0] ) < Date.now()
    ) {
      continue;
    }

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
