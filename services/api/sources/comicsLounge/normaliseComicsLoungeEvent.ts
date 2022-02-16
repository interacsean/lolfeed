import { ComLngEvtRaw } from './types';
import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../../events/types';
import { not, isEmpty, compose } from 'ramda';
import { parseFromTimeZone, parseFromString } from 'date-fns-timezone';
import replaceMonthWithNumeric from '../../../../utils/date/replaceMonthWithNumeric';

const convertTime = (date: string, time: string) => {
  try {
    const dateOnly = date.match(/\d+\s+\w+\s+\d\d\d\d/) || null;

    const dateCleaned = dateOnly ? dateOnly[0].replaceAll(/\s+/g, ' ') : null;
    const dateWithNumMonth = dateCleaned
      ? replaceMonthWithNumeric(dateCleaned).padStart(10, '0')
      : null;

    const timeOnly = time.match(/[\d\.\:apm]+/i) || null;
    const timeCleaned = timeOnly
      ? timeOnly[0].replaceAll(/\s/g, ' ').replace('.', ':')
      : null;
    const timeWithMins = !timeCleaned
      ? null
      : timeCleaned.includes(':')
      ? timeCleaned
      : `${timeCleaned.substring(
          0,
          timeCleaned.length - 2,
        )}:00${timeCleaned.substring(timeCleaned.length - 2)}`;

    return parseFromString(
      `${dateWithNumMonth} ${timeWithMins}`,
      'DD MM YYYY H:mmA',
    ).getTime();
  } catch (e) {
    return null;
  }
};

export const getComicsLoungeId = (event: ComLngEvtRaw) => {
  const pathParts = event.bookingLink
    .split('-detail')
    .reverse()
    .filter(compose(not, isEmpty))[0]
    ?.split('/'); ///index.php/events/cl22_26-29jan-detail
  return `CLG-${pathParts[pathParts.length - 1]}`;
};

const normaliseComicsLoungeEvent = (ce: ComLngEvtRaw): ComEvent | null => {
  const timestamp = convertTime(ce.dateRawStart, ce.timeRaw);

  if (!timestamp) return null;
  return {
    uid: getComicsLoungeId(ce),
    source: Sources.COMICS_LOUNGE,
    title: ce.title,
    ...(ce.subTitle && { subTitle: ce.subTitle }),
    venueName: 'Comics Lounge, North Melbourne',
    timezone: 'Australia/Melbourne',
    timestamp: [timestamp],
    timestampPrecision: TimestampPrecision.TIME,
    orderLink: `https://thecomicslounge.com.au${ce.bookingLink}`,
    price: null,
    ...(ce.imgSrc && { imgSrc: `https://thecomicslounge.com.au${ce.imgSrc}` }),
    approval: defaultEvtApproval,
  };
};

export default normaliseComicsLoungeEvent;
