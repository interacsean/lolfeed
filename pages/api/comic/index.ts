import type { NextApiRequest, NextApiResponse } from 'next';
import getComics from '../../../services/database/comics/getComics';
import { ComicRecord } from '../../../services/database/comics/types';
import { ApiErrResponse } from '../../../utils/api/ApiErrResponse';

export type ComicResponse = ApiErrResponse | ComicRecord[];

export default function comicRoute(
  req: NextApiRequest,
  res: NextApiResponse<ComicResponse>,
) {
  if (req.method === 'GET') {
    return getComics().then((comics) => res.json(comics));
  }
  return res.status(404).json({
    message: 'Unsupported method',
    errors: [`Unsupported method: ${req.method}`],
  });
}
