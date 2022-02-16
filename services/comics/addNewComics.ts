import { difference } from 'ramda';
import getComics from '../database/comics/getComics';
import upsertComics from '../database/comics/upsertComics';

const addNewComics = (comics: string[]) => {
  return getComics()
    .then((existingComics) => existingComics.map((c) => c.name))
    .then((exComicNames) => difference(comics, exComicNames))
    .then((newComicNames) =>
      upsertComics(
        newComicNames.map((name) => ({
          name,
        })),
      ),
    );
};

export default addNewComics;
