import firebaseAdmin from '../';
import FirebaseFirestore from '@google-cloud/firestore';
import updateRecordComEvent from './updateRecordComEvent';
import { EvtRecord } from './types';
import { mergeDeepLeft } from 'ramda';

export type StoredEvt<T = any> = EvtRecord

const eventsCollection = firebaseAdmin.firestore().collection('events').withConverter({
  toFirestore(modelObject: EvtRecord): FirebaseFirestore.DocumentData {
    return modelObject;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot<StoredEvt>): null | EvtRecord {
    const fsData = snapshot.data();
    return mergeDeepLeft(
      {
        meta: { id: snapshot.id },
      },
      fsData,
    )
  }
});

export default eventsCollection;
