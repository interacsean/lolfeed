import type { NextApiRequest, NextApiResponse } from 'next'
import { ComEvent, ComEventSummary } from '../../services/events/types';
import { fork } from 'errable';
import getComedyRepublic from '../../services/api/sources/comedyRepublic/getComedyRepublic';
import getRubberChicken from '../../services/api/sources/rubberChicken/getRubberChicken';

export type EventResponse = {
  events: ComEventSummary[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse>
) {
  return getRubberChicken().then(
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
