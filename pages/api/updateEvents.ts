import { NextApiRequest, NextApiResponse } from 'next';
import { EventResponse } from './events';

export default function UpdateEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventResponse | ApiErrResponse>
) {
  res.status(400).send({ message: 'Not implemented' })
}