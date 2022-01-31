import normaliseMixedEvent from '../../api/sources/normaliseMixedEvent';
import { mergeDeepLeft } from 'ramda';
import { EvtApproval, EvtRecord } from './types';

/**
 * Prefill an EvtRecord based on source data, and optional existing EvtRecord
 */
const fillEventRecord = (
  event: Partial<Omit<EvtRecord, 'meta'>>
    & { meta?: Partial<EvtRecord['meta']> }
    & Pick<EvtRecord, 'source' | 'rawEvent'>,
  currRecord: null | EvtRecord = null,
): EvtRecord | null => {
  const comEvent = normaliseMixedEvent(event);
  if (!comEvent) return null;

  const evtRecordWithDefaults = mergeDeepLeft(
    event,
    {
      rawEvent: {},
      fieldOverrides: {},
      comEvent,
      meta: {
        uid: comEvent.uid,
        parseTime: Date.now(),
        approval: EvtApproval.DEFAULT
      },
    },
  );
  const comEventWithOverrides = mergeDeepLeft(
      currRecord?.fieldOverrides || event.fieldOverrides || {},
      evtRecordWithDefaults.comEvent,
    );
  return mergeDeepLeft(
    { comEvent: comEventWithOverrides },
    evtRecordWithDefaults,
  );
}

export default fillEventRecord;
