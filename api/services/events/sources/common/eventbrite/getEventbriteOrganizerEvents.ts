import axios from 'axios';
import getEventbriteSeriesEvents from './getEventbriteSeriesEvents';
import { EvtBrtSeriesDataRaw } from './types';

const getEventbriteOrganizerEvents = async (organizerPath: string) =>
  axios
    .get(`https://www.eventbrite.com.au/o/${organizerPath}`)
    .then(({ data }) => {
      const ldEvents = JSON.parse(
        data.match(/window\.__SERVER_DATA__ = ({.*?});[\r\n]/)?.[1],
      )?.jsonld?.[1] as EvtBrtSeriesDataRaw[];

      const allIndividualEventDates = Promise.all(
        ldEvents.map((seriesData) =>
          getEventbriteSeriesEvents(seriesData.url as string).then(
            (individualEvents) =>
              !individualEvents
                ? [
                    {
                      individualEventData: null,
                      seriesData,
                    },
                  ]
                : individualEvents.map((individualEventData) => ({
                    individualEventData,
                    seriesData,
                  })),
          ),
        ),
      ).then((x) => x.flat());
      return allIndividualEventDates;
    });

export default getEventbriteOrganizerEvents;
