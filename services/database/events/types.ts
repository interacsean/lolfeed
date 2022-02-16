import { ComEvent, EvtApproval, Sources } from '../../events/types';
import { MixedEvtRaw } from '../../api/sources/types';

export type EvtRecord = {
  source: Sources;
  rawEvent: MixedEvtRaw;
  comEvent: ComEvent;
  fieldOverrides: Partial<ComEvent>;
  meta: {
    uid: string;
    parseTime: number;
  };
};
