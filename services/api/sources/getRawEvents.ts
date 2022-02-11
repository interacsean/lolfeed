import getComicsLounge from './comicsLounge/getComicsLounge';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import getRubberChicken from './rubberChicken/getRubberChicken';
import getGeorgesBar from './georgesBar/getGeorgesBar';
import { notErr } from 'errable';
import { Sources } from '../../events/types';
import { MixedEvtRaw } from './types';
import getRochey, { getRocheyId } from './rochey/getRochey';
import getBobbiePeels from './bobbiePeels/getBobbiePeels';
import { getBobbiePeelsId } from './bobbiePeels/normaliseBobbiePeelsEvent';
import { ApiErrorOr } from '../../../utils/api/ApiErrorOr';
import { getComicsLoungeId } from './comicsLounge/normaliseComicsLoungeEvent';
import { getComedyRepublicId } from './comedyRepublic/normaliseComedyRepublicEvent';
import { getGeorgesBarId } from './georgesBar/normaliseGeorgesBarEvent';
import { getRubberChickenId } from './rubberChicken/normaliseRubberChickenEvent';
import getDirtySecrets from './dirtySecrets/getDirtySecrets';
import { getDirtySecretsId } from './dirtySecrets/normaliseDirtySecretsEvent';

const rawEventPairs = [
  [getBobbiePeels, getBobbiePeelsId, Sources.BOBBIE_PEELS] as const,
  [getComicsLounge, getComicsLoungeId, Sources.COMICS_LOUNGE] as const,
  [getComedyRepublic, getComedyRepublicId, Sources.COMEDY_REPUBLIC] as const,
  [getDirtySecrets, getDirtySecretsId, Sources.DIRTY_SECRETS] as const,
  [getGeorgesBar, getGeorgesBarId, Sources.GEORGES_BAR] as const,
  [getRochey, getRocheyId, Sources.ROCHEY] as const,
  [getRubberChicken, getRubberChickenId, Sources.RUBBER_CHICKEN] as const,
]

export type RawEventAndInfo = { source: Sources, rawEvent: MixedEvtRaw, uid: string }

const getRawEvents = (): Promise<RawEventAndInfo[]> => {
  return Promise.all(
    rawEventPairs.map(([getter, _getId, _source]) => getter())
  )
    .then((rawEventSets) =>
      rawEventSets.map(
        (rawEventSet, i) => notErr(rawEventSet)
          ? rawEventSet
            .map(rawEvent => {
              // @ts-ignore (mixed array confuses this)
              const uid = rawEventPairs[i][1](rawEvent);
              if (!uid) return null;
              return ({
                source: rawEventPairs[i][2],
                uid,
                rawEvent,
              });
            })
            .filter(x => !!x) as RawEventAndInfo[]
          : []
      ).flat()
    );
};

export default getRawEvents;
