import { ComEvent, EvtApproval, Sources } from '../../events/types';
import { MixedEvtRaw } from '../../events/sources/types';

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
