import * as dateFnsTz from 'date-fns-timezone';
import { format } from 'date-fns';
import { TimestampPrecision } from '../../services/events/types';


const renderDate = (
  times: [number] | [number, number],
  precision: TimestampPrecision,
  timeZone: string = 'Australia/Melbourne',
) => {
  const today = dateFnsTz.convertToTimeZone(Date.now() + (1000 * 60 * 60 * 24 * 5), { timeZone });
  const start = dateFnsTz.convertToTimeZone(
    times[0],
    { timeZone },
  );
  const end = !times[1] ? null : dateFnsTz.convertToTimeZone(
    times[1],
    { timeZone },
  );
  const thisYear = ((end || start).getFullYear() === today.getFullYear());
  const thisMonth = thisYear && ((end || start).getMonth() === today.getMonth());

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

  const startFmt = format(
    start,
    `${showStartTime ? ' h:mmaaa ' : ''}EEE do${showStartMonth ? ' MMM' : ''}${showStartYear ? ' yyyy' : ''}`,
  );

  const endFmt = end && (
    showEndTime
      ? format(end, ' – h:mmaaa')
      : format(
        end,
        ` – EEE do${showEndMonth ? ' MMM' : ''}${showEndYear ? ' yyyy' : ''}`,
      )
  );

  return `${startFmt}${endFmt || ''}`;
}

export default renderDate;
