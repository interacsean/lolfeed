import { ComRepEvt, ComRepGuestTokenResponse } from './types';
import { ComEvent } from '../../../events/types';
import { not, isEmpty } from 'ramda';
import { parseFromTimeZone } from 'date-fns-timezone';

const convertTime = (dateTime: string) => {
  return parseFromTimeZone(dateTime, { timeZone: 'Australia/Melbourne' }).getTime()
}

const normaliseComedyRepublicEvents = (crEvents: ComRepEvt[]): ComEvent[] => {
  return crEvents.map(
    cre => ({
      title: cre.EventLine1,
      ...cre.EventLine2 && { subTitle: cre.EventLine2 },
      ...cre.Description && { description: cre.Description },
      venue: {
        name: [cre.VenueName, cre.VenueSuburb].filter(not(isEmpty)).join(', '),
      },
      timestamp: convertTime(cre.EventStartDate),
      orderLink: `https://tccinc.sales.ticketsearch.com/sales/salesevent/${cre.EventId}`,
      ...cre.DefaultImagePath && { imgSrc: cre.DefaultImagePath },
      // save original datas
    })
  )
}

export default normaliseComedyRepublicEvents;
