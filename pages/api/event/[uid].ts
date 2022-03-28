import { NextApiRequest, NextApiResponse } from 'next';
import { equals, isNil } from 'ramda';
import {
  ComEvent,
  ComEventSummary,
  Sources,
} from '../../../services/events/types';
import getEventRecord from '../../../services/database/events/getEventRecord';
import { ifNotNullAsync } from 'errable';
import upsertEvent from '../../../services/database/events/upsertEvent';
import fillEventRecord from '../../../services/database/events/fillEventRecord';
import addNewComics from '../../../services/comics/addNewComics';
import { ApiErrResponse } from '../../../utils/api/ApiErrResponse';

const comEventFieldNames = [
  'venueName',
  'venueSlug',
  'timestampPrecision',
  'timestamp',
  'tags',
  'title',
  'subTitle',
  'imgSrc',
  'price',
  'description',
  'comicsHeadline',
  'comicsFeatured',
  'comicsSupport',
];

const action = (uid: string, event: Partial<ComEventSummary & ComEvent>) => {
  return getEventRecord(uid)
    .then((curEventRecord) => {
      if (!curEventRecord)
        return fillEventRecord({
          rawEvent: event,
          source: event.source || Sources.GENERATED_GENERAL, // todo: should reference actual venue is possible
          fieldOverrides: {}, // todo: should be diff between default and the `event`
        });
      const { comEvent } = curEventRecord;

      const fieldOverrides: Partial<ComEvent> = {
        ...comEventFieldNames.reduce((acc, key) => {
          return {
            ...acc,
            // @ts-ignore
            ...(!isNil(event[key]) && !equals(event[key], comEvent[key])
              ? {
                  // @ts-ignore
                  [key]: event[key],
                  // @ts-ignore
                }
              : !isNil(curEventRecord.fieldOverrides[key]) &&
                !equals(curEventRecord.fieldOverrides[key], comEvent[key])
              ? {
                  // @ts-ignore
                  [key]: curEventRecord.fieldOverrides[key],
                }
              : {}),
          };
        }, {}),
        // todo: nested fields (venue
      };

      addNewComics([
        ...(event.comicsFeatured || []),
        ...(event.comicsHeadline || []),
        ...(event.comicsSupport || []),
      ]);
      return {
        ...curEventRecord,
        fieldOverrides,
      };
    })
    .then(
      ifNotNullAsync((updatedEventRecord) => {
        return upsertEvent(uid, updatedEventRecord);
      }),
    );
};

type Response =
  | {
      complete: true;
    }
  | ApiErrResponse;

export default function eventRoute(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method === 'POST') {
    return action(req.query.uid as string, req.body)
      .then(() => {
        res.json({ complete: true });
      })
      .catch((err: any) => {
        res
          .status(400)
          .json({ message: err?.message || 'Unknown error', errors: [err] });
      });
  }
  return res
    .status(404)
    .json({
      message: 'Unsupported method',
      errors: [`Unsupported method: ${req.method}`],
    });
}
