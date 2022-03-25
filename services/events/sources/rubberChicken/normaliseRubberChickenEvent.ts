import { RbrChkEvtRaw } from './types';
import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../types';
import { not, isEmpty, compose } from 'ramda';
import { parseFromTimeZone, parseFromString } from 'date-fns-timezone';
import replaceMonthWithNumeric from '../../../../utils/date/replaceMonthWithNumeric';

export const extractTime = (rawDesc: string) => {
  // todo: Fix if there's a year rollover
  const year = new Date().getFullYear();

  const isDateRangeNoTime = rawDesc.match(
    /^(.*?)\s*[-–]\s*(\w*?)\s*(\d+)\s*[-–—]\s*(\d+)$/,
  );
  const [, desc, month, daySt, dayFn]: (string | null)[] =
    isDateRangeNoTime || Array(5).fill(null);
  if (desc && daySt && month && dayFn) {
    const timestamp = [
      parseFromString(
        `${daySt.padStart(2, '0')} ${replaceMonthWithNumeric(
          month,
        )} ${year} 12:00PM`,
        'DD MM YYYY H:mmA',
      ).getTime(),
      parseFromString(
        `${dayFn.padStart(2, '0')} ${replaceMonthWithNumeric(
          month,
        )} ${year} 12:00PM`,
        'DD MM YYYY H:mmA',
      ).getTime(),
    ];
    return [desc, timestamp, TimestampPrecision.DAY] as const;
  }

  const isTimeOfDate = rawDesc.match(
    /^(.*?)\s*[-–]\s*(\w*?)\s*(\d+)\s*(\w*?)\s*[-–]?\s?([\d\.:]+)(am|pm)$/i,
  );
  const [, desc2, , day2, month2, time, ampm]: (string | null)[] =
    isTimeOfDate || Array(7).fill(null);
  if (desc2 && day2 && month2 && time && ampm) {
    const timeWColon = time.replace('.', ':');
    const timeWithMins = timeWColon.includes(':')
      ? timeWColon
      : `${timeWColon}:00`;
    const dateString = `${day2.padStart(2, '0')} ${replaceMonthWithNumeric(
      month2,
    )} ${year} ${timeWithMins}${ampm.toUpperCase()}`;
    const timestamp = [
      parseFromString(dateString, 'DD MM YYYY H:mmA').getTime(),
    ];
    return [desc2, timestamp, TimestampPrecision.TIME] as const;
  }

  const isTimeOfDateRev = rawDesc.match(
    /^(.*?)\s*[-–]\s*(\w*?)\s*(\w*?)\s*(\d+)\s*[-–]?\s*([\d\.:]+)(am|pm)$/i,
  );
  const [, desc3, , month3, day3, time3, ampm3]: (string | null)[] =
    isTimeOfDateRev || Array(7).fill(null);
  if (desc3 && day3 && month3 && time3 && ampm3) {
    const timeWColon = time3.replace('.', ':');
    const timeWithMins = timeWColon.includes(':')
      ? timeWColon
      : `${timeWColon}:00`;
    const dateString = `${day3.padStart(2, '0')} ${replaceMonthWithNumeric(
      month3,
    )} ${year} ${timeWithMins}${ampm3.toUpperCase()}`;
    const timestamp = [
      parseFromString(dateString, 'DD MM YYYY H:mmA').getTime(),
    ];
    return [desc3, timestamp, TimestampPrecision.TIME] as const;
  }

  return Array(3).fill(null);
};

export const getRubberChickenId = (event: RbrChkEvtRaw) => `RBC-${event.id}`;

const normaliseRubberChickenEvent = (ce: RbrChkEvtRaw): ComEvent | null => {
  const [title, timestamp, timestampPrecision] = extractTime(ce.descCombined);
  if (!timestamp || !title || !timestampPrecision) return null;

  return {
    uid: getRubberChickenId(ce),
    source: Sources.RUBBER_CHICKEN,
    title,
    venueName: 'The Rubber Chicken, South Melbourne',
    timezone: 'Australia/Melbourne',
    timestamp,
    timestampPrecision,
    orderLink: `https://therubberchicken.com.au/${ce.bookingLink}`,
    ...(ce.imgSrc && { imgSrc: ce.imgSrc }),
    price: (ce.price && parseFloat(ce.price)) || null,
    approval: defaultEvtApproval,
  };
};

export default normaliseRubberChickenEvent;
