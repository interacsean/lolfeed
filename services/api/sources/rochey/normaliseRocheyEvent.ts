import { RocheyEvtRaw } from './types';
import { ComEvent } from '../../../events/types';
import getNormalisedTryBookingEvent from '../common/trybooking/getNormalisedTryBookingEvent';
import { rocheyTrybookingEid } from './getRochey';

const normaliseRocheyEvent = (ce: RocheyEvtRaw): ComEvent | null =>
  getNormalisedTryBookingEvent(rocheyTrybookingEid, 'RCY', ce)

export default normaliseRocheyEvent;
