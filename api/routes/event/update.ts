import { NextApiRequest, NextApiResponse } from 'next';
import getRawEvents from '../../services/events/sources/getRawEvents';
import addNewEvents from '../../services/database/events/addNewEvents';
import { err, fork } from 'errable';
import App from '../../../config/App';
import { ApiErrResponse } from '../../../utils/api/ApiErrResponse';

const action = () => {
  return getRawEvents()
    .then(addNewEvents)
    .then(() => true)
    .catch((e) => err(e.message || 'Unknown error'));
};

type Result =
  | {
      complete: true;
    }
  | ApiErrResponse<string>;

export default function Update(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  if (req.query.auth !== App.adminKey) {
    res.status(401).send({ message: 'Not authorized' });
    return;
  }
  return action().then(
    fork(
      () => res.send({ complete: true }),
      (e) =>
        res.status(500).send({ message: 'Could not complete', errors: [e] }),
    ),
  );
}
