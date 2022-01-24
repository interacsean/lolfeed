import { ComRepEvtRaw } from './types';
import { ComEvent } from '../../../events/types';
import { not, isEmpty, compose } from 'ramda';
import { parseFromTimeZone } from 'date-fns-timezone';

const convertTime = (dateTime: string) => {
  return parseFromTimeZone(dateTime, { timeZone: 'Australia/Melbourne' }).getTime()
}

const normaliseComedyRepublicEvents = (crEvents: ComRepEvtRaw[]): ComEvent[] =>
  crEvents.map(
    cre => ({
      title: cre.EventLine1,
      ...cre.EventLine2 && { subTitle: cre.EventLine2 },
      ...cre.Description && { description: cre.Description },
      venue: {
        name: [cre.VenueName, cre.VenueSuburb].filter(compose(not, isEmpty)).join(', '),
      },
      timestamp: convertTime(cre.EventStartDate),
      orderLink: `https://tccinc.sales.ticketsearch.com/sales/salesevent/${cre.EventId}`,
      ...cre.DefaultImagePath && { imgSrc: cre.DefaultImagePath },
      // save original datas
    }),
  )

export default normaliseComedyRepublicEvents;
