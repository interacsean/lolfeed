import axios from 'axios';
import { EvtBrtIndividualEvtDetailRaw } from './types';

const getEventbriteSeriesEvents = async (url: string): Promise<null | EvtBrtIndividualEvtDetailRaw[]> => {
  const seriesId = url.split('-').reverse()[0];
  if (!seriesId) return null;
  return axios
    .get(`https://www.eventbrite.com/api/v3/series/${seriesId}/events/?time_filter=current_future&expand=series_dates%2Cticket_availability%2Cevent_sales_status%2Cvenue&page_size=12&continuation=`)
    .then(({ data }) => data?.events)
    .catch(() => null);
};

export default getEventbriteSeriesEvents;
