import firebaseAdmin from '../';
import { firestore } from 'firebase-admin';
import { ComicRecord } from './types';

const comicsCollection = firebaseAdmin
  .firestore()
  .collection('comics') as firestore.CollectionReference<ComicRecord>;

export default comicsCollection;
