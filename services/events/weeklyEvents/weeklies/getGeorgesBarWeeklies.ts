import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';

const getGeorgesBarId = (date: Date) => `GGB-${date.toISOString().substring(0,10)}`;

const getGeorgesBarWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourThu = getNextNDates(4, DayOfWeek.Wednesday, 19, 30);

  return nextFourThu.map((date) => {
    return {
      uid: getGeorgesBarId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Comedy Wednesday at Georges',
      //subTitle: Headliner usually available
      venue: {
        name: 'Georges Bar',
      },
      orderLink: 'https://www.eventbrite.com.au/o/georges-bar-32126450903',
      timestamp: [date.getTime()],
      source: Sources.GENERATED_GEORGES_BAR,
      price: 10,
      tags: [Tags.SHOWCASE, Tags.FREE],
    };
  });
}

export default getGeorgesBarWeeklies;
