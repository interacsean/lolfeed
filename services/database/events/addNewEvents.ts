import { FieldPath } from '@google-cloud/firestore';
import { Sources } from '../../events/types';
import { MixedEvtRaw } from '../../api/sources/types';
import { getComedyRepublicId } from '../../api/sources/comedyRepublic/normaliseComedyRepublicEvent';
import { getComicsLoungeId } from '../../api/sources/comicsLounge/normaliseComicsLoungeEvent';
import { getRubberChickenId } from '../../api/sources/rubberChicken/normaliseRubberChickenEvent';
import { getGeorgesBarId } from '../../api/sources/georgesBar/normaliseGeorgesBarEvent';
import eventsCollection from './events';
import fillEventRecord from './fillEventRecord';
import { EvtRecord } from './types';
import getEventRecord from './getEventRecord';

const getIdMap = {
  [Sources.GEORGES_BAR]: getGeorgesBarId,
  [Sources.COMEDY_REPUBLIC]: getComedyRepublicId,
  [Sources.COMICS_LOUNGE]: getComicsLoungeId,
  [Sources.RUBBER_CHICKEN]: getRubberChickenId,
}

const getEventId = (event: MixedEvtRaw, source: Sources) => {
  return (getIdMap[source] || (() => null))(event as unknown as any);
}

const addNewEvents = async (events: Pick<EvtRecord, 'source' | 'rawEvent'>[]) => {
  for(const e in events) {
    const event = events[e];
    const eventId = getEventId(event.rawEvent, event.source);
    if (!eventId) continue;

    const currRecord = await getEventRecord(eventId);
    const processedEvent = fillEventRecord(event, currRecord);
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
