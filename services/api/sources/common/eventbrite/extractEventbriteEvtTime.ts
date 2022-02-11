import { EvtBrtSeriesDataRaw } from './types';

const extractEventbriteEvtTime = (ce: EvtBrtSeriesDataRaw) => {
  return [
    new Date(ce.startDate).getTime(),
    ...ce.endDate ? [new Date(ce.endDate).getTime()] : []
  ] as [number] | [number, number];
}

export default extractEventbriteEvtTime;
