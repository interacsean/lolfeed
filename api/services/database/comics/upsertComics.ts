import comicsCollection from './comics';
import { ComicRecord } from '../../../../domain/comics/types';
import asyncMap from '../../../../utils/flow/asyncLoop';

const upsertComics = (newComics: ComicRecord[]) => {
  return asyncMap((newComic) => {
    return comicsCollection.add(newComic);
  }, newComics);
};

export default upsertComics;
