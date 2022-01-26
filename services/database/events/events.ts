import firebaseAdmin from '../';
import FirebaseFirestore from '@google-cloud/firestore';
import { ComEvent, Sources } from '../../events/types';

export enum EvtApproval {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED_WITH_TRUST = 'APPROVED_WITH_TRUST',
  APPROVED_MANUALLY = 'APPROVED_MANUALLY',
  REJECTED = 'REJECTED',
}

export type EvtRecord<T = any> = {
  source: Sources,
  sourceEvent: T,
  // cachedComEvent?: ComEvent,
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
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<StoredEvt>): EvtRecord {
    return snapshot.data();
  }
});

export default eventsCollection;
