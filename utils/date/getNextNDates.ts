import { convertToTimeZone } from 'date-fns-timezone';
import {
  addDays,
  getDay,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns/fp';
import { pipe } from 'ramda';

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

const getNextNDates = (
  num: number,
  dayOfWeek: DayOfWeek,
  hours: number,
  mins: number = 0,
  timezone: string = 'Australia/Melbourne',
  timestamp: number = Date.now(),
) => {
  const localDate = convertToTimeZone(timestamp, { timeZone: timezone });
  const localDayOfWeek = getDay(localDate);
  const daysTilFirstOccur = (dayOfWeek - localDayOfWeek + 7) % 7;
  const firstOccur = pipe(
    addDays(daysTilFirstOccur),
    setSeconds(0),
    setMilliseconds(0),
    setHours(hours),
    mins !== undefined ? setMinutes(mins) : (x) => x,
  )(localDate);
  return Array(num)
    .fill(null)
    .map((_n, i) => (i === 0 ? firstOccur : addDays(i * 7, firstOccur)));
};

export default getNextNDates;
