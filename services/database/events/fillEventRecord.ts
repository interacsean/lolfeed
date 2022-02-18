import normaliseMixedEvent from '../../events/sources/normaliseMixedEvent';
import { mergeDeepLeft } from 'ramda';
import { EvtRecord } from './types';
import { ComEvent, defaultEvtApproval, EvtApproval } from '../../events/types';

/**
 * Prefill an EvtRecord based on source data, and optional existing EvtRecord
 */
const fillEventRecord = (
  event: Partial<Omit<EvtRecord, 'meta'>> & {
    meta?: Partial<EvtRecord['meta']>;
  } & Pick<EvtRecord, 'source' | 'rawEvent'>,
  currRecord: null | EvtRecord = null,
): EvtRecord | null => {
  const comEvent = normaliseMixedEvent(event);
  if (!comEvent) return null;

  const evtRecordWithDefaults = mergeDeepLeft(event, {
    rawEvent: {},
    fieldOverrides: {} as Partial<ComEvent>,
    comEvent: mergeDeepLeft(comEvent, { approval: defaultEvtApproval }),
    meta: {
      uid: comEvent.uid,
      parseTime: Date.now(),
    },
  });

  const comEventWithOverrides = mergeDeepLeft(
    currRecord?.fieldOverrides || event.fieldOverrides || {},
    evtRecordWithDefaults.comEvent,
  );

  return mergeDeepLeft(
    { comEvent: comEventWithOverrides },
    evtRecordWithDefaults,
  ) as EvtRecord;
};

export default fillEventRecord;
