import { EvtBrtEvtRaw } from '../common/eventbrite/types';

export type CmdClrEvtRaw = Pick<EvtBrtEvtRaw, 'individualEventData'> &
  Pick<Partial<EvtBrtEvtRaw>, 'seriesData'>;
