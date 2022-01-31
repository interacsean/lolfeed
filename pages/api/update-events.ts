import { NextApiRequest, NextApiResponse } from 'next';
import getRawEvents from '../../services/api/sources/getRawEvents';
import addNewEvents from '../../services/database/events/addNewEvents';

export default function UpdateEvents(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.auth !== '998') {
    res.status(401).send({ message: 'Not authorized' });
    return;
  }
  getRawEvents().then(async (mixedEvents) => {
    await addNewEvents(mixedEvents);
    res.send({ done: true });
  })
}
