import axios from 'axios';
import scrapy from 'node-scrapy';
import { RbrChkEvtRaw } from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import { err } from 'errable';

const scrapeModel = {
  events: [
    '.products > li',
    {
      imgSrc: '.entry-featured > a > img (datasrc)',
      descCombined: 'h3 > a',
      bookingLink: 'h3 > a (href)',
      price: '.price .amount bdi',
      id: '.entry-header > a (dataproductid)',
    }
  ],
}

const getRubberChicken = (): Promise<ApiErrorOr<RbrChkEvtRaw[]>> => axios.get(
  `https://therubberchicken.com.au/buy-tickets/`
).then
  (({ data }) => {
    const structured = scrapy.extract(data.replace(/data-src/g, 'datasrc').replace(/data-product_id/g, 'dataproductid'), scrapeModel) as { events?: RbrChkEvtRaw[] };
    // todo: clean
    return structured?.events || err({ message: 'Could not get Rubber Chicken events', errors: structured });
  });

export default getRubberChicken;
