import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../services/events/types';
import { fork } from 'errable';
import getSpecialEvents from '../../services/api/sources/getSpecialEvents';

export type EventResponse = {
  events: ComEventSummary[]
}

let cachedResult: EventResponse | null = null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  if (cachedResult !== null) {
    res.json(cachedResult);
    return;
  }
  // todo: get events from cache

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
