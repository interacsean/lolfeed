import { ComRepEvtRaw } from './comedyRepublic/types';
import { ComLngEvtRaw } from './comicsLounge/types';
import { DtyScrEvtRaw } from './dirtySecrets/types';
import { GrgBarEvtRaw } from './georgesBar/types';
import { RocheyEvtRaw } from './rochey/types';
import { RbrChkEvtRaw } from './rubberChicken/types';

export type MixedEvtRaw =
  | ComRepEvtRaw
  | ComLngEvtRaw
  | DtyScrEvtRaw
  | GrgBarEvtRaw
  | RocheyEvtRaw
  | RbrChkEvtRaw
  | {};
