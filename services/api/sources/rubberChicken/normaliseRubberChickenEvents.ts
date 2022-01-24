import { ComLngEvtRaw, RbrChkEvtRaw } from './types';
import { ComEvent } from '../../../events/types';
import { not, isEmpty, compose } from 'ramda';
import { parseFromTimeZone, parseFromString } from 'date-fns-timezone';
import replaceMonthWithNumeric from '../../../../utils/string/replaceMonthWithNumeric';

const convertTime = (date: string, time: string) => {
  try {
    return parseFromString(``, 'DD MM YYYY H:mmA').getTime();
  } catch (e) {
    return null;
  }
}

const normaliseRubberEvents = (cEvents: RbrChkEvtRaw[]): ComEvent[] =>
  cEvents.map(
    (ce): ComEvent | null => {
      // const timestamp = convertTime(ce.dateRawStart, ce.timeRaw);
      // if (!timestamp) return null;
      return ({
        title: ce.descCombined,
        // ...ce.subTitle && { subTitle: ce.subTitle },
        venue: {
          name: 'The Rubber Chicken, South Melbourne',
        },
        timestamp: 0,
        orderLink: `https://therubberchicken.com.au/${ce.bookingLink}`,
        ...ce.imgSrc && { imgSrc: ce.imgSrc },
        // save original datas
      });
    },
  ).filter(compose(not, isEmpty)) as ComEvent[]

export default normaliseRubberEvents;
