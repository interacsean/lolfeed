import { EvtRecord } from '../../../../api/services/database/events/types';
import { EvtApproval, Sources } from '../../types';
import { getDay } from 'date-fns';

const reject = (evt: EvtRecord) => {
  if (
    // Remove duplicate listing
    evt.source === Sources.DIRTY_SECRETS &&
    evt.comEvent.title === 'Dirty Secrets Comedy' &&
    getDay(evt.comEvent.timestamp[0]) === 0
  ) {
    return {
      ...evt,
      comEvent: {
        ...evt.comEvent,
        approval: EvtApproval.REJECTED_BY_RULE,
      },
    };
  }
  return evt;
};

export default reject;
