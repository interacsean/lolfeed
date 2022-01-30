import { ComEvent } from '../types';
import bobbiePeels from './weeklies/bobbiePeels';

const addWeeklyEvents = (evts: ComEvent[]): ComEvent[] => {
  const now = Date.now();

  const baseWeeklies = [
    ...bobbiePeels(now),
  ];
  // Check evts for overrides, add in weeklies that don't exist
  // For now, hardcoded, then can pull from db
  return evts.concat(baseWeeklies);
}

export default addWeeklyEvents;
