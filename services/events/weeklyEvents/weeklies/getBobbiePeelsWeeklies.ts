import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getBobbiePeelId = (date: Date) => `BBP-${date.toISOString().substring(0,10)}`;

const getBobbiePeelsWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Thursday, 20, 30);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getBobbiePeelId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Comedy upstairs',
      subTitle: 'Open mic at Bobbie Peels',
      description: `Signup at the venue from 7.30pm.
      
${unconfirmedMessage}`,
      venue: {
        name: 'Bobbie Peels',
      },
      orderLink: 'https://www.facebook.com/ComedyUpstairsMelb/events/',
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.GENERATED_BOBBY_PEELS,
      tags: [Tags.OPEN_MIC, Tags.FREE],
    };
  });
}

export default getBobbiePeelsWeeklies;
