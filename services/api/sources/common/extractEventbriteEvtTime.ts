import { EvtBrtEvtRaw } from './types';

const extractEventbriteEvtTime = (ce: EvtBrtEvtRaw) => {
  return [
    new Date(ce.startDate).getTime(),
    ...ce.endDate ? [new Date(ce.endDate).getTime()] : []
  ] as [number] | [number, number];
}

export default extractEventbriteEvtTime;
