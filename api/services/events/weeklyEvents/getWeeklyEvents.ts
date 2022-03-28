import getGuerillaResistanceWeeklies from './weeklies/getGuerillaResistanceWeeklies';
import getGasoWeeklies from './weeklies/getGasoWeeklies';

const getWeeklyEvents = (now = Date.now()) => {
  return [
    ...getGuerillaResistanceWeeklies(now),
    ...getGasoWeeklies(now),
    // ...getLanternWeeklies(now),
  ];
};

export default getWeeklyEvents;
