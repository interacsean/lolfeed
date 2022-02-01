import { ComRepEvtRaw } from './comedyRepublic/types';
import { ComLngEvtRaw } from './comicsLounge/types';
import { RbrChkEvtRaw } from './rubberChicken/types';
import { GrgBarEvtRaw } from './georgesBar/types';

export type MixedEvtRaw =
  | ComRepEvtRaw
  | ComLngEvtRaw
  | RbrChkEvtRaw
  | GrgBarEvtRaw
  | {};
