import getComicsLounge from './comicsLounge/getComicsLounge';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import getRubberChicken from './rubberChicken/getRubberChicken';
import getGeorgesBar from './georgesBar/getGeorgesBar';
import { notErr } from 'errable';
import { Sources } from '../../events/types';
import { MixedEvtRaw } from './types';

const getRawEvents = (): Promise<{ source: Sources, rawEvent: MixedEvtRaw }[]> => Promise.all([
  getComicsLounge(),
  getComedyRepublic(),
  getGeorgesBar(),
  getRubberChicken(),
])
  .then(([
    comicLoungeEvents,
    comedyRepublicEvents,
    georgesBarEvents,
    rubberChickenEvents,
  ]) =>
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
      ...notErr(georgesBarEvents)
        ? georgesBarEvents.map(rawEvent => ({
          source: Sources.GEORGES_BAR,
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
