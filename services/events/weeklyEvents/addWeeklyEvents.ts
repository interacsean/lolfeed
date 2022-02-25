import { ComEvent } from '../types';
import getGasoWeeklies from './weeklies/getGasoWeeklies';
import { StrRecord } from '../../../types/StrRecord';
import getGuerillaResistanceWeeklies from './weeklies/getGuerillaResistanceWeeklies';

const addWeeklyEvents = (evts: ComEvent[]): ComEvent[] => {
  const now = Date.now();

  const dbEvtIdMap = evts
    .map((e) => e.uid)
    .reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {} as StrRecord<true>);

  const baseWeeklies = [
    ...getGuerillaResistanceWeeklies(now),
    ...getGasoWeeklies(now),
    // ...getLanternWeeklies(now),
  ];

  const weekliesToAdd = baseWeeklies.filter(
    (wkly) => dbEvtIdMap[wkly.uid] !== true,
  );

  // Replace weeklies that have a db record

  return evts.concat(weekliesToAdd);
};

export default addWeeklyEvents;
