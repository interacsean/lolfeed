import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../services/events/types';
import { fork, notErr } from 'errable';
import getComedyRepublic from '../../services/api/sources/comedyRepublic/getComedyRepublic';
import getRubberChicken from '../../services/api/sources/rubberChicken/getRubberChicken';
import getComicsLounge from '../../services/api/sources/comicsLounge/getComicsLounge';
import normaliseComedyRepublicEvents from '../../services/api/sources/comedyRepublic/normaliseComedyRepublicEvents';
import normaliseComicsLoungeEvents from '../../services/api/sources/comicsLounge/normaliseComicsLoungeEvents';

export type EventResponse = {
  events: ComEventSummary[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  // todo: get events from cache... not the below!

  return Promise.all([
    getComicsLounge(),
    getComedyRepublic(),
    // getRubberChicken(),
  ]).then(
    ([comicLoungeEvents, comedyRepublicEvents, rubberChickenEvents]) =>
      [
      ...notErr(comicLoungeEvents) ? normaliseComicsLoungeEvents(comicLoungeEvents) : [],
      ...notErr(comedyRepublicEvents) ? normaliseComedyRepublicEvents(comedyRepublicEvents) : [],
      // ...notErr(rubberChickenEvents) ? normaliseComedyRepublicEvents(rubberChickenEvents) : [],
    ]
  ).then(
    // sortEvents
    normalisedEvents => normalisedEvents
  ).then(
    fork<any, ComEvent[]>(
      (comedyEventResult) => {
        res.json({ events: comedyEventResult });
      },
      (err) => {
        // @ts-ignore
        res.status(400).json(err);
      },
    )
  );
}
