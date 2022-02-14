import { RocheyEvtRaw } from './types';
import { ComEvent, Sources } from '../../../events/types';
import getNormalisedTryBookingEvent from '../common/trybooking/getNormalisedTryBookingEvent';
import { rocheyTrybookingEid } from './getRochey';

const normaliseRocheyEvent = (ce: RocheyEvtRaw): ComEvent | null => {
  const rchEvt = getNormalisedTryBookingEvent(rocheyTrybookingEid, 'RCY', ce)
  return !rchEvt ? null : {
    source: Sources.ROCHEY,
    ...rchEvt,
  }
}


export default normaliseRocheyEvent;
