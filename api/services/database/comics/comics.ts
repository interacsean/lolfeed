import firebaseAdmin from '../index';
import { firestore } from 'firebase-admin';
import { ComicRecord } from '../../../../domain/comics/types';

const comicsCollection = firebaseAdmin
  .firestore()
  .collection('comics') as firestore.CollectionReference<ComicRecord>;

export default comicsCollection;
