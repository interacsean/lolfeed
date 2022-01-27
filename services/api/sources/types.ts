import { ComRepEvtRaw } from './comedyRepublic/types';
import { ComLngEvtRaw } from './comicsLounge/types';
import { RbrChkEvtRaw } from './rubberChicken/types';

export type MixedEvt = ComRepEvtRaw | ComLngEvtRaw | RbrChkEvtRaw;