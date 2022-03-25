import { map, mergeDeepLeft, prop, filter, sort } from 'ramda';
import getEvents from '../database/events/getEvents';
import processCustomRules from './processCustomRules/processCustomRules';
import addWeeklyEvents from './weeklyEvents/addWeeklyEvents';
import { EvtRecord } from '../database/events/types';
import { ComEvent } from './types';

const applyOverrides = (evt: EvtRecord) => {
  return mergeDeepLeft({ comEvent: evt.fieldOverrides }, evt) as EvtRecord;
};

const futureEventsOnly = (e: ComEvent | null) =>
  !!e && (e.timestamp[1] || e.timestamp[0]) > Date.now();

const getComedyEvents = () => {
  return getEvents()
    .then(map(processCustomRules))
    .then(map(applyOverrides))
    .then(map(prop('comEvent')))
    .then(addWeeklyEvents)
    .then(filter(futureEventsOnly))
    .then(sort((a, b) => a.timestamp[0] - b.timestamp[0]));
};

export default getComedyEvents;
