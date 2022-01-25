import getComicsLounge from './comicsLounge/getComicsLounge';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import getRubberChicken from './rubberChicken/getRubberChicken';
import { notErr } from 'errable';
import normaliseComicsLoungeEvents from './comicsLounge/normaliseComicsLoungeEvents';
import normaliseComedyRepublicEvents from './comedyRepublic/normaliseComedyRepublicEvents';
import normaliseRubberChickenEvents from './rubberChicken/normaliseRubberChickenEvents';

const getSpecialEvents = () =>  Promise.all([
  getComicsLounge(),
  getComedyRepublic(),
  getRubberChicken(),
]).then(
  ([comicLoungeEvents, comedyRepublicEvents, rubberChickenEvents]) =>
    [
      ...notErr(comicLoungeEvents) ? normaliseComicsLoungeEvents(comicLoungeEvents) : [],
      ...notErr(comedyRepublicEvents) ? normaliseComedyRepublicEvents(comedyRepublicEvents) : [],
      ...notErr(rubberChickenEvents) ? normaliseRubberChickenEvents(rubberChickenEvents) : [],
    ]
).then(
  // sortEvents
  normalisedEvents => normalisedEvents.sort(
    (a, b) => a.timestamp - b.timestamp
  )
)

export default getSpecialEvents;
