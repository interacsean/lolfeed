import type { NextApiRequest, NextApiResponse } from 'next';
import { ComEvent, ComEventSummary } from '../../../services/events/types';
import { fork } from 'errable';
import getComedyEvents from '../../../services/events/getComedyEvents';
import { ApiErrResponse } from '../../../utils/api/ApiErrResponse';

export type EventResponse = {
  events: ComEventSummary[];
};

const USE_CACHE = false;
let cachedResult: EventResponse | null = null;

export default function eventsRoute(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse | ApiErrResponse>,
) {
  if (USE_CACHE && cachedResult !== null) {
    res.json(cachedResult);
    return;
  }

  return getComedyEvents().then(
    fork<unknown, ComEvent[]>(
      (comedyEventResult) => {
        cachedResult = { events: comedyEventResult };
        res.json(cachedResult);
      },
      (err: any) => {
        res.status(400).json({
          message: err?.message || 'Could not complete',
          errors: [err],
        });
      },
    ),
  );
}
