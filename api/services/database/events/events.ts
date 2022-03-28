import FirebaseFirestore from '@google-cloud/firestore';
import { mergeDeepLeft } from 'ramda';
import firebaseAdmin from '../index';
import { EvtRecord } from './types';

export type StoredEvt<T = any> = EvtRecord;

const eventsCollection = firebaseAdmin
  .firestore()
  .collection('events')
  .withConverter({
    toFirestore(modelObject: EvtRecord): FirebaseFirestore.DocumentData {
      return modelObject;
    },
    fromFirestore(
      snapshot: FirebaseFirestore.QueryDocumentSnapshot<StoredEvt>,
    ): null | EvtRecord {
      const fsData = snapshot.data();
      return mergeDeepLeft(
        {
          meta: { uid: snapshot.id },
        },
        fsData,
      );
    },
  });

export default eventsCollection;
