import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getRedBettyId = (date: Date) =>
  `RDB-${date.toISOString().substring(0, 10)}`;

const getRedBettyWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Tuesday, 18, 30);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getRedBettyId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Comedy at Red Betty',
      description: `${unconfirmedMessage}`,
      venueName: 'Red Betty',
      orderLink: 'https://www.facebook.com/comedyatredbetty/',
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.GENERATED_RED_BETTY,
      tags: [Tags.OPEN_MIC, Tags.SHOWCASE],
      timezone: 'Australia/Melbourne',
      approval: defaultEvtApproval,
    };
  });
};

export default getRedBettyWeeklies;
