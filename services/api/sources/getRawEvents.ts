import getComicsLounge from './comicsLounge/getComicsLounge';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import getRubberChicken from './rubberChicken/getRubberChicken';
import { notErr } from 'errable';
import normaliseComicsLoungeEvent from './comicsLounge/normaliseComicsLoungeEvent';
import normaliseComedyRepublicEvent from './comedyRepublic/normaliseComedyRepublicEvent';
import normaliseRubberChickenEvent from './rubberChicken/normaliseRubberChickenEvent';
import { Sources } from '../../events/types';
import { MixedEvt } from './types';

const getRawEvents = (): Promise<{ source: Sources, sourceEvent: MixedEvt }[]> => Promise.all([
  getComicsLounge(),
  getComedyRepublic(),
  getRubberChicken(),
]).then(
  ([comicLoungeEvents, comedyRepublicEvents, rubberChickenEvents]) =>
    ([
      ...notErr(comicLoungeEvents)
        ? comicLoungeEvents.map(sourceEvent => ({
          source: Sources.COMICS_LOUNGE,
          sourceEvent,
        }))
        : [],
      ...notErr(comedyRepublicEvents)
        ? comedyRepublicEvents.map(sourceEvent => ({
          source: Sources.COMEDY_REPUBLIC,
          sourceEvent,
        }))
        : [],
      ...notErr(rubberChickenEvents)
        ? rubberChickenEvents.map(sourceEvent => ({
          source: Sources.RUBBER_CHICKEN,
          sourceEvent,
        }))
        : [],
    ])
);

export default getRawEvents;
