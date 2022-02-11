import { map, mergeDeepLeft, prop } from 'ramda';
import getEvents from '../database/events/getEvents';
import processCustomRules from './processCustomRules/processCustomRules';
import addWeeklyEvents from './weeklyEvents/addWeeklyEvents';
import { EvtRecord } from '../database/events/types';

const applyOverrides = (evt: EvtRecord) => {
  return mergeDeepLeft(
    { comEvent: evt.fieldOverrides },
    evt,
  );
};

const getComedyEvents = () => {
  return getEvents()
    .then(map(processCustomRules))
    .then(map(applyOverrides))
    .then(map(prop('comEvent')))
    // .then(addWeeklyEvents)
    .then(
      events => events.filter(e => e && (e.timestamp[1] || e.timestamp[0]) > Date.now()),
    )
    .then(
      events => events.sort(
        (a, b) => a.timestamp[0] - b.timestamp[0],
      ),
    );
}

export default getComedyEvents;
