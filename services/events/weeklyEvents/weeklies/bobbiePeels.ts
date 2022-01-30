import { ComEvent, Sources, TimestampPrecision } from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';

const getBobbiePeelId = (date: Date) => `BBP-${date.toISOString().substring(0,10)}`;

const bobbiePeels = (now: number = Date.now()): ComEvent[] => {
  const nextFourThu = getNextNDates(4, DayOfWeek.Thursday, 20, 30);

  return nextFourThu.map((date) => {
    return {
      uid: getBobbiePeelId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Comedy upstairs',
      subTitle: 'Open mic at Bobbie Peels',
      venue: {
        name: 'Bobbie Peels',
      },
      orderLink: '#',
      timestamp: [date.getTime()],
      source: Sources.GENERATED_BOBBY_PEELS,
      tags: [Tags.OPEN_MIC, Tags.FREE],
    };
  });
}

export default bobbiePeels;
