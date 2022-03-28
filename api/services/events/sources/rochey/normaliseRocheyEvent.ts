import { RocheyEvtRaw } from './types';
import { ComEvent, Sources } from '../../../../../domain/events/types';
import getNormalisedTryBookingEvent from '../common/trybooking/getNormalisedTryBookingEvent';
import { rocheyTrybookingEid } from './getRochey';

const normaliseRocheyEvent = (ce: RocheyEvtRaw): ComEvent | null => {
  const rchEvt = getNormalisedTryBookingEvent(rocheyTrybookingEid, 'RCY', ce);
  return !rchEvt
    ? null
    : {
        ...rchEvt,
        source: Sources.ROCHEY,
        venueName: 'The Rochester',
      };
};

export default normaliseRocheyEvent;
