import { map } from 'ramda';

import getEvents from '../../database/events/getEvents';
import { ComEvent } from '../../events/types';
import processCustomRules from '../../events/processCustomRules/processCustomRules';
import addWeeklyEvents from '../../events/addWeeklyEvents';

const getSpecialEvents = () => {
  return getEvents().then(
    map(processCustomRules),
  ).then(
    addWeeklyEvents
  ).then(
    events => events.filter(e => e && (e.timestamp[1] || e.timestamp[0]) > Date.now()),
  ).then(
    events => events.sort(
      (a, b) => a.timestamp[0] - b.timestamp[0],
    ),
  );
}

export default getSpecialEvents;
