import eventsCollection, { EvtRecord } from './events';
import { Sources } from '../../events/types';
import { getComedyRepublicId } from '../../api/sources/comedyRepublic/normaliseComedyRepublicEvent';
import { getComicsLoungeId } from '../../api/sources/comicsLounge/normaliseComicsLoungeEvent';
import { getRubberChickenId } from '../../api/sources/rubberChicken/normaliseRubberChickenEvent';
import { MixedEvt } from '../../api/sources/types';

const getIdMap = {
  [Sources.COMEDY_REPUBLIC]: getComedyRepublicId,
  [Sources.COMICS_LOUNGE]: getComicsLoungeId,
  [Sources.RUBBER_CHICKEN]: getRubberChickenId,
}

const getEventId = (event: MixedEvt, source: Sources) => {
  return (getIdMap[source] || (() => null))(event as unknown as any);
}

const addNewEvents = async (events: Partial<EvtRecord>[]) => {
  for(const e in events) {
    const event = events[e];
    if (!event.source) {
      continue;
    }
    await eventsCollection.doc(getEventId(event.sourceEvent, event.source))
      .set(event, {
        mergeFields: [
          'sourceEvent',
          'source',
        ]
      });
  }
  return {};
}

export default addNewEvents;
