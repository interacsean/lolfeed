import { ComLngEvtRaw } from './types';
import { ComEvent, TimestampPrecision } from '../../../events/types';
import { not, isEmpty, compose } from 'ramda';
import { parseFromTimeZone, parseFromString } from 'date-fns-timezone';
import replaceMonthWithNumeric from '../../../../utils/string/replaceMonthWithNumeric';

const convertTime = (date: string, time: string) => {
  try {
    const dateOnly = date.match(/\d+\s+\w+\s+\d\d\d\d/) || null;

    const dateCleaned = dateOnly ? dateOnly[0].replaceAll(/\s+/g, ' ') : null;
    const dateWithNumMonth = dateCleaned ? replaceMonthWithNumeric(dateCleaned).padStart(10, '0') : null;

    const timeOnly = time.match(/[\d\.\:apm]+/i) || null;
    const timeCleaned = timeOnly ? timeOnly[0].replaceAll(/\s/g, ' ').replace('.', ':') : null;
    const timeWithMins = !timeCleaned ? null : timeCleaned.includes(':') ?  timeCleaned :
      `${timeCleaned.substring(0, timeCleaned.length - 2)}:00${timeCleaned.substring(timeCleaned.length - 2)}`;

    return parseFromString(`${dateWithNumMonth} ${timeWithMins}`, 'DD MM YYYY H:mmA').getTime();
  } catch (e) {
    return null;
  }
}

const normaliseComicsLoungeEvents = (cEvents: ComLngEvtRaw[]): ComEvent[] =>
  cEvents.map(
    (ce): ComEvent | null => {
      const timestamp = convertTime(ce.dateRawStart, ce.timeRaw);
      const pathParts = ce.bookingLinkRaw.split('-detail').reverse().filter(compose(not, isEmpty))[0]?.split('/'); ///index.php/events/cl22_26-29jan-detail

      if (!timestamp) return null;
      return ({
        uid: `CLG-${pathParts[pathParts.length - 1]}`,
        title: ce.title,
        ...ce.subTitle && { subTitle: ce.subTitle },
        venue: {
          name: 'Comics Lounge, North Melbourne',
        },
        timestamp: [timestamp],
        timestampPrecision: TimestampPrecision.TIME,
        orderLink: `https://thecomicslounge.com.au${ce.bookingLinkRaw}`,
        ...ce.imgSrc && { imgSrc: `https://thecomicslounge.com.au${ce.imgSrc}` },
        // price: ce && parseFloat(ce.price) || undefined,
        // save original datas
      });
    },
  ).filter(compose(not, isEmpty)) as ComEvent[]

export default normaliseComicsLoungeEvents;
