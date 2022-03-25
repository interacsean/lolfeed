import { isErr } from 'errable';
import { map } from 'ramda';
import { Sources } from '../types';
import { EvtRaw } from './types';
import { EventMeta, eventSources } from './eventSources';

export type RawEventAndInfo = {
  source: Sources;
  rawEvent: EvtRaw;
  uid: string;
};

const makeVenueEventsReducer =
  (venueSet: EventMeta<EvtRaw>) =>
  (validVenueEvents: RawEventAndInfo[], venueEvent: EvtRaw) => {
    const uid = venueSet.getId(venueEvent);
    if (!!uid) {
      validVenueEvents.push({
        source: venueSet.source,
        uid,
        rawEvent: venueEvent,
      });
    }
    return validVenueEvents;
  };

const getRawEvents = (): Promise<RawEventAndInfo[]> => {
  return Promise.all(
    eventSources.map((eventSource) =>
      eventSource.getEvents().then((events) => ({
        ...eventSource,
        events: isErr(events) ? [] : events,
      })),
    ),
  )
    .then(
      map((venueSet) =>
        venueSet.events.reduce(makeVenueEventsReducer(venueSet), []),
      ),
    )
    .then((venueEventSets) => venueEventSets.flat());
};

export default getRawEvents;
