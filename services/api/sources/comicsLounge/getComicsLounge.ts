import axios from 'axios';
import scrapy from 'node-scrapy';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import { ComLngEvtRaw } from './types';
import { err } from 'errable';

const scrapeModel = {
  events: [
    '.eventsinfo > .event-block > .eventinner',
    {
      imgSrc: '.image-box > a > img (src)',
      title: '.performer',
      subTitle: '.support',
      dateRawStart: '.eventsdate > div:nth-child(1)',
      // todo: deal with events that have different finish date
      dateRawFinish: '.eventsdate > div:nth-child(3)',
      timeRaw: '.otherinfo > div:nth-child(2)',
      bookingLinkRaw: '.otherinfo > div > .msbuy > a (href)',
      // price NA
    }
  ],
}

const getComicsLounge = (): Promise<ApiErrorOr<ComLngEvtRaw[]>> => axios.get(
  `https://thecomicslounge.com.au/index.php/events`
).then
  (({ data }) => {
    const structured = scrapy.extract(data.replace(/data-src/g, 'datasrc'), scrapeModel) as { events?: ComLngEvtRaw[] };
    // todo: get details from each page
    // todo: clean data
    return structured?.events || err({ message: 'Could not get Comics Lounge events', errors: structured });
  });

export default getComicsLounge;
