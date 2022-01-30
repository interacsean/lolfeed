import eventsCollection from './events';
import { Sources } from '../../events/types';
import { getComedyRepublicId } from '../../api/sources/comedyRepublic/normaliseComedyRepublicEvent';
import { getComicsLoungeId } from '../../api/sources/comicsLounge/normaliseComicsLoungeEvent';
import { getRubberChickenId } from '../../api/sources/rubberChicken/normaliseRubberChickenEvent';
import { MixedEvtRaw } from '../../api/sources/types';
import normaliseMixedEvent from '../../api/sources/normaliseMixedEvent';
import updateRecordComEvent from './updateRecordComEvent';
import { EvtRecord } from './types';
import getEventRecord from './getEventRecord';
import { FieldPath } from '@google-cloud/firestore';

const getIdMap = {
  [Sources.COMEDY_REPUBLIC]: getComedyRepublicId,
  [Sources.COMICS_LOUNGE]: getComicsLoungeId,
  [Sources.RUBBER_CHICKEN]: getRubberChickenId,
}

const getEventId = (event: MixedEvtRaw, source: Sources) => {
  return (getIdMap[source] || (() => null))(event as unknown as any);
}

const addNewEvents = async (events: Pick<EvtRecord, 'source' | 'rawEvent'>[]) => {
  for(const e in events.slice(0,3)) {
    const event = events[e];
    const eventId = getEventId(event.rawEvent, event.source);
    if (!eventId) continue;

    const currRecord = await getEventRecord(eventId);
    const processedEvent = updateRecordComEvent(event, currRecord);
    if (!event.source) {
      continue;
    }
    await eventsCollection.doc(eventId)
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
