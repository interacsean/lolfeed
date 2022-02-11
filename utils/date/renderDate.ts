import * as dateFnsTz from 'date-fns-timezone';
import { format } from 'date-fns';
import { TimestampPrecision } from '../../services/events/types';


const renderDate = (
  times: [number] | [number, number],
  precision: TimestampPrecision,
  timeZone: string = 'Australia/Melbourne',
) => {
  const today = dateFnsTz.convertToTimeZone(Date.now(), { timeZone });
  const start = dateFnsTz.convertToTimeZone(
    times[0],
    { timeZone },
  );
  const end = !times[1] ? null : dateFnsTz.convertToTimeZone(
    times[1],
    { timeZone },
  );
  const thisYear = (start.getFullYear() === today.getFullYear());
  const thisMonth = thisYear && (start.getMonth() === today.getMonth());
  const isToday = thisYear && thisMonth && (start.getDate() === today.getDate());

  const sameYear = end && (start.getFullYear() === end.getFullYear());
  const sameMonth = end && sameYear && (start.getMonth() === end.getMonth());
  const sameDate = end && sameMonth && sameYear && (start.getDate() === end.getDate());

  const showStartTime = precision === TimestampPrecision.TIME;
  const showStartYear = !thisYear && (!end || !sameYear);
  const showStartMonth = !thisMonth && (!end || !sameMonth);

  const showEndTime = precision === TimestampPrecision.TIME
    && end && sameDate;
  const showEndYear = !thisYear && end;
  const showEndMonth = !thisMonth && end;

  const startTimeFmt = showStartTime && format(
    start,
    `h:mm${showEndTime ? '' : 'aaa'}`,
  );

  const endTimeFmt = showEndTime && format(
    end,
    `-h:mmaaa`,
  );

  const startDateFmt = isToday ? `To${start.getHours() > 17 ? 'night' : 'day'}` : format(
    start,
    `EEE do${showStartMonth ? ' MMM' : ''}${showStartYear ? ' yyyy' : ''}`,
  );

  const endDateFmt = end && !sameDate && format(
    end,
    ` – EEE do${showEndMonth ? ' MMM' : ''}${showEndYear ? ' yyyy' : ''}`,
  );

  return `${startTimeFmt || ''}${endTimeFmt || ''} ${startDateFmt}${endDateFmt || ''}`;
}

export default renderDate;
