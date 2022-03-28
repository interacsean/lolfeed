import comicsCollection from './comics';
import { sort } from 'ramda';
import { ComicRecord } from '../../../../domain/comics/types';

const sortByName = (a: ComicRecord, b: ComicRecord) =>
  a.name > b.name ? 1 : a.name < b.name ? -1 : 0;

const getComics = () => {
  return comicsCollection
    .get()
    .then((qs) => qs.docs.map((docRef) => docRef.data()))
    .then(sort(sortByName));
};

export default getComics;
