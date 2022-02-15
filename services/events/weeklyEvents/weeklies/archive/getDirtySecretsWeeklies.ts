import { ComEvent, defaultEvtApproval, Sources, TimestampPrecision } from '../../../types';
import { Tags } from '../../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from '../common';

const getDirtySecretsId = (date: Date) => `DSR-${date.toISOString().substring(0,10)}`;

const getDirtySecretsWeeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourSun = getNextNDates(4, DayOfWeek.Sunday, 16);
  const nextFourWed = getNextNDates(4, DayOfWeek.Wednesday, 22);
  const nextFourThu = getNextNDates(4, DayOfWeek.Thursday, 22);

  return [...nextFourSun, ...nextFourWed, ...nextFourThu].map((date) => {
    return {
      uid: getDirtySecretsId(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Dirty Secrets Comedy',
      description: `${unconfirmedMessage}`,
      venueName: 'Caz Reitop\'s Dirty Secrets',
      imgSrc: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F138312863%2F312750544563%2F1%2Foriginal.20210610-165940?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=321ba869a50277ef8ca6913b8bc8afb9',
      orderLink: 'https://www.eventbrite.com/e/dirty-secrets-comedy-tickets-130092932463',
      timestamp: [date.getTime()],
      price: 10,
      source: Sources.GENERATED_DIRTY_SECRETS,
      tags: [Tags.SHOWCASE, Tags.OPEN_MIC],
      timezone: 'Australia/Melbourne',
      approval: defaultEvtApproval,
    };
  });
}

export default getDirtySecretsWeeklies;
