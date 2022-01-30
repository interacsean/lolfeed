import { ComEvent, Sources } from '../../events/types';
import { MixedEvtRaw } from '../../api/sources/types';

export enum EvtApproval {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED_WITH_TRUST = 'APPROVED_WITH_TRUST',
  APPROVED_MANUALLY = 'APPROVED_MANUALLY',
  REJECTED = 'REJECTED',
  DEFAULT = 'APPROVED_WITH_TRUST',
}

export type EvtRecord<T = any> = {
  source: Sources,
  rawEvent: MixedEvtRaw,
  comEvent: ComEvent,
  fieldOverrides: Partial<T>,
  meta: {
    uid: string,
    parseTime: number,
    approval: EvtApproval
  }
}