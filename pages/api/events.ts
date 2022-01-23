import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../services/events/types';
import { fork } from 'errable';
import getComedyRepublic from '../../services/api/sources/comedyRepublic/getComedyRepublic';

export type EventResponse = {
  events: ComEventSummary[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  return getComedyRepublic().then(
    fork<any, ComEvent[]>(
      (comedyRepublicResult) => {
        res.json({ events: comedyRepublicResult });
      },
      (err) => {
        // @ts-ignore
        res.status(400).json(err);
      },
    )
  );
}
