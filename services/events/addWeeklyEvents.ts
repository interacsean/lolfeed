import { ComEvent } from './types';

const addWeeklyEvents = (evts: ComEvent[]) => {
  // Check evts for overrides, add in weeklies that don't exist
  // For now, hardcoded, then can pull from db
  return evts;
}

export default addWeeklyEvents;
