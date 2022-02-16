import type { NextApiRequest, NextApiResponse } from 'next';
import { ComEvent, ComEventSummary } from '../../../services/events/types';
import { fork } from 'errable';
import getComedyEvents from '../../../services/events/getComedyEvents';

export type EventResponse = {
  events: ComEventSummary[];
};

const USE_CACHE = false;
let cachedResult: EventResponse | null = null;

export default function eventsRoute(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>,
) {
  if (USE_CACHE && cachedResult !== null) {
    res.json(cachedResult);
    return;
  }

  return getComedyEvents().then(
    fork<any, ComEvent[]>(
      (comedyEventResult) => {
        cachedResult = { events: comedyEventResult };
        res.json(cachedResult);
      },
      (err) => {
        // @ts-ignore
        res.status(400).json(err);
      },
    ),
  );
}
