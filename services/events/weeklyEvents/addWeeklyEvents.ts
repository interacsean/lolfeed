import { ComEvent } from '../types';
import getBobbiePeelsWeeklies from './weeklies/getBobbiePeelsWeeklies';
// import getGeorgesBarWeeklies from './weeklies/archive/getGeorgesBarWeeklies';
import getGuerillaResistanceWeeklies from './weeklies/getGuerillaResistanceWeeklies';
import getVoltaireWeeklies from './weeklies/getVoltaireWeeklies';
import getLanternWeeklies from './weeklies/getLanternWeeklies';
import getDirtySecretsWeeklies from './weeklies/getDirtySecretsWeeklies';

const addWeeklyEvents = (evts: ComEvent[]): ComEvent[] => {
  const now = Date.now();

  const dbEvtIdMap = evts.map(e => e.uid).reduce(
    (acc, item) => {
      acc[item] = true;
      return acc;
    },
    {} as StrRecord<true>,
  );

  const baseWeeklies = [
    ...getBobbiePeelsWeeklies(now),
    // ...getGeorgesBarWeeklies(now),
    ...getGuerillaResistanceWeeklies(now),
    ...getVoltaireWeeklies(now),
    ...getLanternWeeklies(now),
    ...getDirtySecretsWeeklies(now),
  ];

  const weekliesToAdd = baseWeeklies.filter(
    wkly => dbEvtIdMap[wkly.uid] !== true
  );

  // Replace weeklies that have a db record

  return evts.concat(weekliesToAdd);
}

export default addWeeklyEvents;
