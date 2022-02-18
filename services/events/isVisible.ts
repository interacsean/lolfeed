import { ComEvent, EvtApproval } from './types';

const isVisible = (evt: ComEvent) =>
  [EvtApproval.APPROVED_WITH_TRUST, EvtApproval.APPROVED_MANUALLY].includes(
    evt.approval,
  );

export default isVisible;
