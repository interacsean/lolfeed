import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../../services/events/types';
import { fork } from 'errable';
import getSpecialEvents from '../../../services/events/getSpecialEvents';

export type EventResponse = {
  events: ComEventSummary[]
}

let cachedResult: EventResponse | null = null;

export default function eventsRoute(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  if (cachedResult !== null) {
    res.json(cachedResult);
    return;
  }

  return getSpecialEvents().then(
    fork<any, ComEvent[]>(
      (comedyEventResult) => {
        cachedResult = { events: comedyEventResult };
        res.json(cachedResult);
      },
      (err) => {
        // @ts-ignore
        res.status(400).json(err);
      },
    )
  );
}
