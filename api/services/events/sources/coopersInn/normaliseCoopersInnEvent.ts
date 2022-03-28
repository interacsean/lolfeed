import { CprInnEvtRaw } from './types';
import { ComEvent, Sources } from '../../../../../domain/events/types';
import getNormalisedTryBookingEvent from '../common/trybooking/getNormalisedTryBookingEvent';
import { coopersInnTrybookingEid } from './getCoopersInn';

const normaliseCoopersInnEvent = (ce: CprInnEvtRaw): ComEvent | null => {
  const rchEvt = getNormalisedTryBookingEvent(
    coopersInnTrybookingEid,
    'CPI',
    ce,
  );
  return !rchEvt
    ? null
    : {
        ...rchEvt,
        source: Sources.COOPERS_INN,
        venueName: 'Coopers Inn',
      };
};

export default normaliseCoopersInnEvent;
