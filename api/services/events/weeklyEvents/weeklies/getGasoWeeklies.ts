import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../../../../domain/events/types';
import { Tags } from '../../../../../domain/events/tags/tags';
import getNextNDates, {
  DayOfWeek,
} from '../../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const getGasoId = (date: Date) => `GSO-${date.toISOString().substring(0, 10)}`;

const getGasoWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Tuesday, 19, 30);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getGasoId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Gaso Comedy',
      description: `${unconfirmedMessage}`,
      venueName: 'The Gasometer Hotel',
      orderLink: 'https://www.facebook.com/bestcomedyroom/',
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.GASO,
      tags: [],
      timezone: 'Australia/Melbourne',
      approval: defaultEvtApproval,
    };
  });
};

export default getGasoWeeklies;
