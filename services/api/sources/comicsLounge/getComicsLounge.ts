import axios from 'axios';
import scrapy from 'node-scrapy';

const scrapeModel = {
  events: [
    '.eventsinfo > .event-block > .eventinner',
    {
      imgSrc: '.image-box > a > img (src)',
      title: '.performer',
      subTitle: '.support',
      dateRaw: '.otherinfo > div:first-child',
      timeRaw: '.otherinfo > div:nth-child(2)',
      bookingLinkRaw: '.otherinfo > div > .msbuy > a (href)',
      // price NA
    }
  ],
}

const getComicsLounge = () => axios.get(
  `https://thecomicslounge.com.au/index.php/events`
).then
  (({ data }) => {
    const structured = scrapy.extract(data.replace(/data-src/g, 'datasrc'), scrapeModel);
    console.log(structured?.events);
    // todo: clean data
    return structured?.events;
  });

export default getComicsLounge;
