import { ComEvent, EvtApproval, Sources } from '../../events/types';
import { EvtRaw } from '../../events/sources/types';

export type EvtRecord = {
  source: Sources;
  rawEvent: EvtRaw;
  comEvent: ComEvent;
  fieldOverrides: Partial<ComEvent>;
  meta: {
    uid: string;
    parseTime: number;
  };
};
