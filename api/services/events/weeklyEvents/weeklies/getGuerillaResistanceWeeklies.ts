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

const getGuerillaResistanceId = (date: Date) =>
  `GRS-${date.toISOString().substring(0, 10)}`;

const getGuerillaResistanceWeeklies = (
  now: number = Date.now(),
): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Wednesday, 20);

  return nextFourOccurrances.map((date) => {
    return {
      uid: getGuerillaResistanceId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Guerilla Stand-up Comedy',
      description: unconfirmedMessage,
      venueName: 'The Resistance',
      orderLink: 'https://theresistance.net.au/',
      timestamp: [date.getTime()],
      source: Sources.GENERATED_GUERILLA_RESISTANCE,
      price: 0,
      tags: [Tags.SHOWCASE, Tags.FREE],
      timezone: 'Australia/Melbourne',
      approval: defaultEvtApproval,
    };
  });
};

export default getGuerillaResistanceWeeklies;
