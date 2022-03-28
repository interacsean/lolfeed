import { map, mergeDeepLeft, prop, filter, sort } from 'ramda';
import getEventsServiceFn from '../../api/services/database/events/getEvents';
import getWeeklyEventsServiceFn from '../../api/services/events/weeklyEvents/getWeeklyEvents';
import processCustomRules from './processCustomRules/processCustomRules';
import { EvtRecord } from '../../api/services/database/events/types';
import { StrRecord } from '../../types/StrRecord';
import { ComEvent } from './types';

const applyOverrides = (evt: EvtRecord) => {
  return mergeDeepLeft({ comEvent: evt.fieldOverrides }, evt) as EvtRecord;
};

const futureEventsOnly = (e: ComEvent | null) =>
  !!e && (e.timestamp[1] || e.timestamp[0]) > Date.now();

type Dependencies = {
  getEvents: typeof getEventsServiceFn;
  getWeeklyEvents: typeof getWeeklyEventsServiceFn;
};

const addWeeklyEvents = (
  evts: ComEvent[],
  weeklyEvents: ComEvent[],
): ComEvent[] => {
  const dbEvtIdMap = evts
    .map((e) => e.uid)
    .reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {} as StrRecord<true>);

  const weekliesToAdd = weeklyEvents.filter(
    (wkly) => dbEvtIdMap[wkly.uid] !== true,
  );

  return evts.concat(weekliesToAdd);
};

const getComedyEvents =
  ({ getEvents, getWeeklyEvents }: Dependencies) =>
  () => {
    return getEvents()
      .then(map(processCustomRules))
      .then(map(applyOverrides))
      .then(map(prop('comEvent')))
      .then(async (evts) => addWeeklyEvents(evts, await getWeeklyEvents()))
      .then(filter(futureEventsOnly))
      .then(sort((a, b) => a.timestamp[0] - b.timestamp[0]));
  };

export default getComedyEvents;
