import { NextApiRequest, NextApiResponse } from 'next';
import getRawEvents from '../../services/api/sources/getRawEvents';
import addNewEvents from '../../services/database/events/addNewEvents';
import { err, fork } from 'errable';

const action = () => {
  return getRawEvents()
    .then(addNewEvents)
    .then(() => true)
    .catch((e) => err(e.message || 'Unknown error'));
};

export default function UpdateEvents(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.query.auth !== '998') {
    res.status(401).send({ message: 'Not authorized' });
    return;
  }
  action().then(
    fork(
      () => res.send({ done: true }),
      (e) => res.status(500).send({ error: e }),
    ),
  );
}
