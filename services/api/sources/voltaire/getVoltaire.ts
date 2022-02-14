import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { VltEvtRaw } from './types';
import { ifErr } from 'errable';

const getVoltaire = (): Promise<ApiErrorOr<VltEvtRaw[]>> =>
  Promise.all([
    getEventbriteOrganizerEvents('club-voltaire-comedy-10799435555'),
    getEventbriteOrganizerEvents('friday-open-mic-comedy-at-voltaire-17948052023'),
    getEventbriteOrganizerEvents('funny-stuff-comedy-32692509771'),
  ]).then(
    all => all.map(
      ifErr(() => [] as VltEvtRaw[])
    ).flat() as VltEvtRaw[]
  );

export default getVoltaire;
