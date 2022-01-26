import { MixedEvt } from './types';
import { Sources } from '../../events/types';
import normaliseComedyRepublicEvent, { getComedyRepublicId } from './comedyRepublic/normaliseComedyRepublicEvent';
import normaliseComicsLoungeEvent, { getComicsLoungeId } from './comicsLounge/normaliseComicsLoungeEvent';
import normaliseRubberChickenEvent, { getRubberChickenId } from './rubberChicken/normaliseRubberChickenEvent';
import { EvtRecord } from '../../database/events/events';

const getIdMap = {
  [Sources.COMEDY_REPUBLIC]: normaliseComedyRepublicEvent,
  [Sources.COMICS_LOUNGE]: normaliseComicsLoungeEvent,
  [Sources.RUBBER_CHICKEN]: normaliseRubberChickenEvent,
}

const normaliseMixedEvent = (event: EvtRecord) =>
  (getIdMap[event.source] || (() => null))(event.sourceEvent)


export default normaliseMixedEvent;
