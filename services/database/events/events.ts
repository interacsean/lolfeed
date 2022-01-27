import { mergeDeepLeft } from 'ramda';
import firebaseAdmin from '../';
import FirebaseFirestore from '@google-cloud/firestore';
import { ComEvent, Sources } from '../../events/types';
import normaliseMixedEvent from '../../api/sources/normaliseMixedEvent';

export enum EvtApproval {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED_WITH_TRUST = 'APPROVED_WITH_TRUST',
  APPROVED_MANUALLY = 'APPROVED_MANUALLY',
  REJECTED = 'REJECTED',
  DEFAULT = 'APPROVED_WITH_TRUST',
}

export type EvtRecord<T = any> = {
  source: Sources,
  sourceEvent: T,
  comEvent: ComEvent,
  fieldOverrides: Partial<T>,
  meta: {
    approval: EvtApproval
  }
}

export type StoredEvt<T = any> = EvtRecord

const eventsCollection = firebaseAdmin.firestore().collection('events').withConverter({
  toFirestore(modelObject: EvtRecord): FirebaseFirestore.DocumentData {
    return modelObject;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<StoredEvt>): null | EvtRecord {
    const fsData = snapshot.data();
    const nData = normaliseMixedEvent(fsData);
    if (!nData) return null;
    const evtRecordWithDefaults = mergeDeepLeft(
      fsData,
      {
        sourceEvent: {},
        fieldOverrides: {},
        comEvent: nData,
        meta: {
          approval: EvtApproval.DEFAULT
        }
      },
    );
    const comEventWithOverrides = mergeDeepLeft(
      fsData.fieldOverrides,
      evtRecordWithDefaults.comEvent,
    );
    return mergeDeepLeft(
      { comEvent: comEventWithOverrides },
      evtRecordWithDefaults,
    ) as EvtRecord
  }
});

export default eventsCollection;
