import { ComLngEvtRaw, ComRepEvt, ComRepGuestTokenResponse } from './types';
import { ComEvent } from '../../../events/types';
import { not, isEmpty } from 'ramda';
import { parseFromTimeZone } from 'date-fns-timezone';

const convertTime = (date: string, time: string) => {
  return parseFromTimeZone(date, { timeZone: 'Australia/Melbourne' }).getTime()
}

const normaliseComicsLoungeEvents = (cEvents: ComLngEvtRaw[]): ComEvent[] =>
  cEvents.map(
    ce => ({
      title: ce.title,
      ...ce.subTitle && { subTitle: ce.subTitle },
      venue: {
        name: 'Comics Lounge, North Melbourne',
      },
      timestamp: 0, // convertTime(ce.dateRaw, ce.timeRaw),
      orderLink: `https://thecomicslounge.com.au${ce.bookingLinkRaw}`,
      ...ce.imgSrc && { imgSrc: `https://thecomicslounge.com.au${ce.imgSrc}` },
      // save original datas
    }),
  )

export default normaliseComicsLoungeEvents;
