import { MixedEvtRaw } from './types';
import { Sources } from '../../events/types';
import normaliseComedyRepublicEvent, { getComedyRepublicId } from './comedyRepublic/normaliseComedyRepublicEvent';
import normaliseComicsLoungeEvent, { getComicsLoungeId } from './comicsLounge/normaliseComicsLoungeEvent';
import normaliseRubberChickenEvent, { getRubberChickenId } from './rubberChicken/normaliseRubberChickenEvent';
import { EvtRecord } from '../../database/events/types';

const getIdMap = {
  [Sources.COMEDY_REPUBLIC]: normaliseComedyRepublicEvent,
  [Sources.COMICS_LOUNGE]: normaliseComicsLoungeEvent,
  [Sources.RUBBER_CHICKEN]: normaliseRubberChickenEvent,
}

const normaliseMixedEvent = (event: Pick<EvtRecord, 'source' | 'rawEvent'>) => {
  if (!Sources[event.source]) {
    throw Error(`invalid event source: ${event.source}`)
  }
  // @ts-ignore (should work if mapping is correct above)
  return (getIdMap[event.source])(event.rawEvent);
}


export default normaliseMixedEvent;
