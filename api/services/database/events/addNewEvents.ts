import { FieldPath } from '@google-cloud/firestore';
import eventsCollection from './events';
import fillEventRecord from './fillEventRecord';
import getEventRecord from './getEventRecord';
import { RawEventAndInfo } from '../../events/sources/getRawEvents';
import normaliseMixedEvent from '../../events/sources/normaliseMixedEvent';
import asyncMap from '../../../../utils/flow/asyncLoop';

const addNewEvents = async (events: RawEventAndInfo[]) => {
  asyncMap(async (eventRecord) => {
    const { uid, ...event } = eventRecord;
    if (!uid) return;

    const prelimNormEvent = normaliseMixedEvent(event);
    if (
      !prelimNormEvent ||
      (prelimNormEvent.timestamp[1] || prelimNormEvent.timestamp[0]) <
        Date.now()
    ) {
      return;
    }

    const currRecord = await getEventRecord(uid);
    const processedEvent = fillEventRecord(event, currRecord);
    await eventsCollection.doc(uid).set(
      processedEvent,
      !currRecord
        ? {}
        : {
            mergeFields: [
              'rawEvent',
              'source',
              'comEvent',
              new FieldPath('meta', 'parseTime'),
            ],
          },
    );
    return;
  }, events);
  return {};
};

export default addNewEvents;
