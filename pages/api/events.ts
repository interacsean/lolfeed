import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../services/events/types';
import { fork } from 'errable';
import getSpecialEvents from '../../services/api/sources/getSpecialEvents';

export type EventResponse = {
  events: ComEventSummary[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  // todo: get events from cache

  return getSpecialEvents().then(
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
