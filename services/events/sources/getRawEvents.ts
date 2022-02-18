import { notErr } from 'errable';
import { Sources } from '../types';
import { MixedEvtRaw } from './types';
import { eventSources } from './eventSources';

export type RawEventAndInfo = {
  source: Sources;
  rawEvent: MixedEvtRaw;
  uid: string;
};

const mapRawEventWithInfo =
  (venueNumber: number) => (rawEvent: MixedEvtRaw) => {
    // @ts-ignore (mixed array confuses this)
    const uid = eventSources[venueNumber].getId(rawEvent);
    if (!uid) return null;
    return {
      source: eventSources[venueNumber].source,
      uid,
      rawEvent,
    };
  };

const getRawEvents = (): Promise<RawEventAndInfo[]> => {
  return Promise.all(eventSources.map(({ getEvents }) => getEvents())).then(
    (venuesEvents) =>
      venuesEvents
        .map((venueEvents, i) =>
          notErr(venueEvents)
            ? (venueEvents
                .map(mapRawEventWithInfo(i))
                .filter((x) => x !== null) as RawEventAndInfo[])
            : [],
        )
        .flat(),
  );
};

export default getRawEvents;
