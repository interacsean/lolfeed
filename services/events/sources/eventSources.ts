import getBobbiePeels from './bobbiePeels/getBobbiePeels';
import normaliseBobbiePeelsEvent, {
  getBobbiePeelsId,
} from './bobbiePeels/normaliseBobbiePeelsEvent';
import { ComEvent, Sources } from '../types';
import normaliseComicsLoungeEvent, {
  getComicsLoungeId,
} from './comicsLounge/normaliseComicsLoungeEvent';
import getComicsLounge from './comicsLounge/getComicsLounge';
import normaliseComedyRepublicEvent, {
  getComedyRepublicId,
} from './comedyRepublic/normaliseComedyRepublicEvent';
import getComedyRepublic from './comedyRepublic/getComedyRepublic';
import normaliseDirtySecretsEvent, {
  getDirtySecretsId,
} from './dirtySecrets/normaliseDirtySecretsEvent';
import normaliseGeorgesBarEvent, {
  getGeorgesBarId,
} from './georgesBar/normaliseGeorgesBarEvent';
import getGeorgesBar from './georgesBar/getGeorgesBar';
import getRochey, { getRocheyId } from './rochey/getRochey';
import normaliseRubberChickenEvent, {
  getRubberChickenId,
} from './rubberChicken/normaliseRubberChickenEvent';
import getRubberChicken from './rubberChicken/getRubberChicken';
import normaliseVoltaireEvent, {
  getVoltaireId,
} from './voltaire/normaliseVoltaireEvent';
import getVoltaire from './voltaire/getVoltaire';
import normaliseRocheyEvent from './rochey/normaliseRocheyEvent';
import getDirtySecrets from './dirtySecrets/getDirtySecrets';
import { MixedEvtRaw } from './types';
import { ApiErrorOr } from '../../../utils/api/ApiErrorOr';
import getLimboVoltaire from './limboVoltaire/getLimboVoltaire';
import normaliseLimboVoltaireEvent, {
  getLimboVoltaireId,
} from './limboVoltaire/normaliseLimboVoltaireEvent';
import getCoopersInn, { getCoopersInnId } from './coopersInn/getCoopersInn';
import normaliseCoopersInnEvent from './coopersInn/normaliseCoopersInnEvent';
import normaliseRaiseTheBarEvent, {
  getRaiseTheBarId,
} from './raiseTheBar/normaliseRaiseTheBarEvent';
import getRaiseTheBar from './raiseTheBar/getRaiseTheBar';

type EventMeta<T extends MixedEvtRaw> = {
  source: Sources;
  getId: (ev: T) => string | null;
  getEvents: () => Promise<ApiErrorOr<T[]>>;
  normalise: (ev: T) => ComEvent | null;
};

export const eventSources: EventMeta<any>[] = [
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
  },
  {
    source: Sources.LIMBO_VOLTAIRE,
    getId: getLimboVoltaireId,
    getEvents: getLimboVoltaire,
    normalise: normaliseLimboVoltaireEvent,
  },
  {
    source: Sources.COOPERS_INN,
    getId: getCoopersInnId,
    getEvents: getCoopersInn,
    normalise: normaliseCoopersInnEvent,
  },
  {
    source: Sources.RAISE_THE_BAR,
    getId: getRaiseTheBarId,
    getEvents: getRaiseTheBar,
    normalise: normaliseRaiseTheBarEvent,
  },
];
