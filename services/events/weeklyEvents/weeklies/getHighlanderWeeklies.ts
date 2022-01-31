import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getHighlanderId = (date: Date) => `HLD-${date.toISOString().substring(0,10)}`;

const getHighlanderWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Tuesday, 20);

  // every two weeks?
  return nextFourOccurrances.map((date) => {
    return {
      uid: getHighlanderId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Free Comedy',
      description: `Limited sign-up spots.
      
${unconfirmedMessage}`,
      venueName: 'Highlander Bar',
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.GENERATED_HIGHLANDER,
      tags: [Tags.OPEN_MIC, Tags.FREE],
    };
  });
}

export default getHighlanderWeeklies;
