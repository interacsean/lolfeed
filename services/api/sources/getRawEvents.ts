import getComicsLounge from './comicsLounge/getComicsLounge';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import getRubberChicken from './rubberChicken/getRubberChicken';
import { notErr } from 'errable';
import normaliseComicsLoungeEvent from './comicsLounge/normaliseComicsLoungeEvent';
import normaliseComedyRepublicEvent from './comedyRepublic/normaliseComedyRepublicEvent';
import normaliseRubberChickenEvent from './rubberChicken/normaliseRubberChickenEvent';
import { Sources } from '../../events/types';
import { MixedEvtRaw } from './types';

const getRawEvents = (): Promise<{ source: Sources, rawEvent: MixedEvtRaw }[]> => Promise.all([
  getComicsLounge(),
  getComedyRepublic(),
  getRubberChicken(),
]).then(
  ([comicLoungeEvents, comedyRepublicEvents, rubberChickenEvents]) =>
    ([
      ...notErr(comicLoungeEvents)
        ? comicLoungeEvents.map(rawEvent => ({
          source: Sources.COMICS_LOUNGE,
          rawEvent,
        }))
        : [],
      ...notErr(comedyRepublicEvents)
        ? comedyRepublicEvents.map(rawEvent => ({
          source: Sources.COMEDY_REPUBLIC,
          rawEvent,
        }))
        : [],
      ...notErr(rubberChickenEvents)
        ? rubberChickenEvents.map(rawEvent => ({
          source: Sources.RUBBER_CHICKEN,
          rawEvent,
        }))
        : [],
    ])
);

export default getRawEvents;
