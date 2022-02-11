import getBobbiePeels from './bobbiePeels/getBobbiePeels';
import normaliseBobbiePeelsEvent, { getBobbiePeelsId } from './bobbiePeels/normaliseBobbiePeelsEvent';
import { Sources } from '../../events/types';
import normaliseComicsLoungeEvent, { getComicsLoungeId } from './comicsLounge/normaliseComicsLoungeEvent';
import getComicsLounge from './comicsLounge/getComicsLounge';
import normaliseComedyRepublicEvent, { getComedyRepublicId } from './comedyRepublic/normaliseComedyRepublicEvent';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import normaliseDirtySecretsEvent, { getDirtySecretsId } from './dirtySecrets/normaliseDirtySecretsEvent';
import normaliseGeorgesBarEvent, { getGeorgesBarId } from './georgesBar/normaliseGeorgesBarEvent';
import getGeorgesBar from './georgesBar/getGeorgesBar';
import getRochey, { getRocheyId } from './rochey/getRochey';
import normaliseRubberChickenEvent, { getRubberChickenId } from './rubberChicken/normaliseRubberChickenEvent';
import getRubberChicken from './rubberChicken/getRubberChicken';
import normaliseVoltaireEvent, { getVoltaireId } from './voltaire/normaliseVoltaireEvent';
import getVoltaire from './voltaire/getVoltaire';
import normaliseRocheyEvent from './rochey/normaliseRocheyEvent';
import getDirtySecrets from './dirtySecrets/getDirtySecrets';

export const eventSources = [
  {
    source: Sources.BOBBIE_PEELS,
    getId: getBobbiePeelsId,
    getEvents: getBobbiePeels,
    normalise: normaliseBobbiePeelsEvent,
  },
  {
    source: Sources.COMICS_LOUNGE,
    getId: getComicsLoungeId,
    getEvents: getComicsLounge,
    normalise: normaliseComicsLoungeEvent,
  },
  {
    source: Sources.COMEDY_REPUBLIC,
    getId: getComedyRepublicId,
    getEvents: getComedyRepublic,
    normalise: normaliseComedyRepublicEvent,
  },
  {
    source: Sources.DIRTY_SECRETS,
    getId: getDirtySecretsId,
    getEvents: getDirtySecrets,
    normalise: normaliseDirtySecretsEvent,
  },
  {
    source: Sources.GEORGES_BAR,
    getId: getGeorgesBarId,
    getEvents: getGeorgesBar,
    normalise: normaliseGeorgesBarEvent,
  },
  {
    source: Sources.ROCHEY,
    getId: getRocheyId,
    getEvents: getRochey,
    normalise: normaliseRocheyEvent,
  },
  {
    source: Sources.RUBBER_CHICKEN,
    getId: getRubberChickenId,
    getEvents: getRubberChicken,
    normalise: normaliseRubberChickenEvent,
  },
  {
    source: Sources.VOLTAIRE,
    getId: getVoltaireId,
    getEvents: getVoltaire,
    normalise: normaliseVoltaireEvent,
  }
];
