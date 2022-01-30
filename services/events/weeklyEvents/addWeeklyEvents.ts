import { ComEvent } from '../types';
import getBobbiePeelsWeeklies from './weeklies/getBobbiePeelsWeeklies';
import getGeorgesBarWeeklies from './weeklies/getGeorgesBarWeeklies';
import getGuerillaResistanceWeeklies from './weeklies/getGuerillaResistanceWeeklies';
import getVoltaireWeeklies from './weeklies/getVoltaireWeeklies';
import getLanternWeeklies from './weeklies/getLanternWeeklies';
import getDirtySecretsWeeklies from './weeklies/getDirtySecretsWeeklies';

const addWeeklyEvents = (evts: ComEvent[]): ComEvent[] => {
  const now = Date.now();

  const baseWeeklies = [
    ...getBobbiePeelsWeeklies(now),
    ...getGeorgesBarWeeklies(now),
    ...getGuerillaResistanceWeeklies(now),
    ...getVoltaireWeeklies(now),
    ...getLanternWeeklies(now),
    ...getDirtySecretsWeeklies(now),
  ];

  // Replace weeklies that have a db record

  return evts.concat(baseWeeklies);
}

export default addWeeklyEvents;
