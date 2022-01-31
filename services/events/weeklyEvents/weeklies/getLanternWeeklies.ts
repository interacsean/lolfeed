import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getLanternId = (date: Date) => `LNT-${date.toISOString().substring(0,10)}`;

const getLanternWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Sunday, 18, 30);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getLanternId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Laughs at Lantern',
      description: `${unconfirmedMessage}`,
      venueName: 'Lantern Lounge',
      orderLink: 'https://www.eventbrite.com.au/e/laughs-at-lantern-tickets-196930373047',
      // Runner: Gavin Sempel
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.GENERATED_LAUGHS_AT_LANTERN,
      tags: [Tags.SHOWCASE, Tags.FREE],
    };
  });
}

export default getLanternWeeklies;
