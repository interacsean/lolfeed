import { TryBkgEvtRaw } from './types';
import { formatToTimeZone, parseFromString } from 'date-fns-timezone';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const extractTryBookingEvtTime = (ev: TryBkgEvtRaw) => {
  const [, _dow, dd, mm, yyyy, hh, ii, ap] = ev.date.match(
    /(\w+) (\d+) (\w+) (\d+) (\d+):(\d+) (\w+)/
  ) || [];
  const [, endHh, endIi, endAp] = ev.date.match(
    /- (\d+):(\d+) (\w+)/
  ) || [];

  const startTime =
    parseFromString(`${dd} ${months.indexOf(mm) + 1} ${yyyy} ${hh}:${ii} ${ap}`, 'D M Y H:m A');
  const endTime = !endHh ? null :
    parseFromString(`${dd} ${months.indexOf(mm) + 1} ${yyyy} ${endHh}:${endIi} ${endAp}`, 'D M Y H:m A');

  return [startTime.getTime(), ...endTime ? [endTime.getTime()] : []] as [number] | [number, number];
}

export default extractTryBookingEvtTime;
