import { difference } from 'ramda';
import getComicsServiceFn from '../../api/services/database/comics/getComics';
import upsertComicsServiceFn from '../../api/services/database/comics/upsertComics';

type Dependencies = {
  getComics: typeof getComicsServiceFn;
  upsertComics: typeof upsertComicsServiceFn;
};

const addNewComics =
  ({ getComics, upsertComics }: Dependencies) =>
  (comics: string[]) => {
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
