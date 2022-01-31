import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getVoltaireId = (date: Date) => `VTR-${date.toISOString().substring(0,10)}`;

const getVoltaireWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Sunday, 19, 15);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getVoltaireId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Stand Up Comedy',
      description: `${unconfirmedMessage}`,
      venueName: 'Club Voltaire',
      orderLink: 'https://www.trybooking.com/events/landing?eid=680324&',
      timestamp: [date.getTime()],
      price: 10,
      source: Sources.GENERATED_VOLTAIRE,
      tags: [Tags.SHOWCASE],
      timezone: 'Australia/Melbourne',
    };
  });
}

export default getVoltaireWeeklies;
