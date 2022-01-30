import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getGuerillaResistanceId = (date: Date) => `GRS-${date.toISOString().substring(0,10)}`;

const getGuerillaResistanceWeeklies = (now: number = Date.now()): ComEvent[] => {
 const nextFourOccurrances = getNextNDates(4, DayOfWeek.Wednesday, 20);

 return nextFourOccurrances.map((date) => {
  return {
   uid: getGuerillaResistanceId(date),
   timestampPrecision: TimestampPrecision.TIME,
   title: 'Guerilla Stand-up Comedy',
   description: unconfirmedMessage,
   //subTitle: Headliner usually available
   venue: {
    name: 'The Resistance',
   },
   orderLink: 'https://theresistance.net.au/',
   timestamp: [date.getTime()],
   source: Sources.GENERATED_GUERILLA_RESISTANCE,
   price: 0,
   tags: [Tags.SHOWCASE, Tags.FREE],
  };
 });
}

export default getGuerillaResistanceWeeklies;
