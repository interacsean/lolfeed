import axios from 'axios';
import scrapy from 'node-scrapy';

const scrapeModel = {
  events: [
    '.products li',
    {
      imgSrc: '.entry-featured > a > img (datasrc)',
      descCombined: 'h3 > a',
      bookingLink: 'h3 > a (href)',
      price: '.price .amount bdi'
    }
  ],
}

const getRubberChicken = () => axios.get(
  `https://therubberchicken.com.au/buy-tickets/`
).then
  (({ data }) => {
    // console.log(data);
    const structured = scrapy.extract(data.replace(/data-src/g, 'datasrc'), scrapeModel);
    console.log(structured);
    return [];
  });

export default getRubberChicken;
