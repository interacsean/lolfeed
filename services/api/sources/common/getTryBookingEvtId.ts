import { EvtBrtEvtRaw, TryBkgEvtRaw } from './types';

const getTryBookingEvtId = (idPrefix: string, event: TryBkgEvtRaw) => {
  return `${idPrefix}-${event.orderAid}-${event.orderEdid}`;
}

export default getTryBookingEvtId;
