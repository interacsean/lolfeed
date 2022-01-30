import { ComEvent } from '../types';
import getBobbiePeelsWeeklies from './weeklies/getBobbiePeelsWeeklies';
import getGeorgesBarWeeklies from './weeklies/getGeorgesBarWeeklies';

const addWeeklyEvents = (evts: ComEvent[]): ComEvent[] => {
  const now = Date.now();

  const baseWeeklies = [
    ...getBobbiePeelsWeeklies(now),
    ...getGeorgesBarWeeklies(now),
  ];

  // Replace weeklies that have a db record

  return evts.concat(baseWeeklies);
}

export default addWeeklyEvents;
