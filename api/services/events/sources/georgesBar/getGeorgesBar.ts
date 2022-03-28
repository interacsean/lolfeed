import axios from 'axios';
import { GrgBarEvtRaw } from './types';
import { ApiErrorOr } from '../../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';

// const scrapeModel = {
//   events: [
//     'div[datatestid=organizer-profile__future-events] article',
//     {
//       titleCombined: 'div[dataspec=event-card__formatted-name--content]',
//       dateRaw: '.eds-event-card-content__sub-title',
//       location: 'div[datasubcontentkey=location]',
//       price: '.eds-event-card-content__sub-content > div:nth-child(2)',
//       imgSrc: '.eds-event-card-content__image-container img (src)',
//       bookingLink: '.eds-event-card-content__primary-content a (href)',
//     }
//   ],
// }

const getGeorgesBar = (): Promise<ApiErrorOr<GrgBarEvtRaw[]>> =>
  getEventbriteOrganizerEvents('georges-bar-32126450903');

// const structured = scrapy.extract(
//   data.replace('data-testid', 'datatestid')
//     .replace('data-spec', 'dataspec')
//     .replace('data-subcontent-key', 'datasubcontentkey'),
//   scrapeModel
// ) as { events?: GrgBarEvtRaw[] };
// return structured?.events || err({ message: 'Could not get GeorgesBar events', errors: structured });

export default getGeorgesBar;
