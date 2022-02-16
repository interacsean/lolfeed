import comicsCollection from './comics';
import { sort } from 'ramda';

const getComics = () => {
  return comicsCollection
    .get()
    .then((qs) => qs.docs.map((docRef) => docRef.data()))
    .then(sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)));
};

export default getComics;
