import axios from 'axios';
import scrapy from 'node-scrapy';
import { ComLngEvtRaw } from '../comicsLounge/types';
import { err } from 'errable';
import { TryBkgEvtRaw } from './types';

const scrapeModel = {
  eventName: '.event-name',
  imgSrc: '.hero__graphic img (src)',
  events: [
    '.group-item > .row > .col-12',
    {
      date: 'div:nth-child(1)',
      desc: 'div:nth-child(3)',
      orderAid: 'button (dataaid)',
      orderEdid: 'button (dataedid)'
    }
  ],
}

const getTryBookingEvents = (eid: string) => axios.get(
  `https://www.trybooking.com/events/landing?eid=${eid}`
).then
(({ data }) => {
  const structured = scrapy.extract(
    data.replace(/data-aid/g, 'dataaid').replace(/data-edid/g, 'dataedid'),
    scrapeModel,
  ) as { events?: TryBkgEvtRaw[] };
  const { events, ...common } = structured;
  return events?.map(ev => ({
    ...common,
    ...ev,
  })) || err({ message: 'Could not get Try Booking events', errors: structured });
});

export default getTryBookingEvents;
