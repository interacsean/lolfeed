import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { VltEvtRaw } from './types';

const getVoltaire = (): Promise<ApiErrorOr<VltEvtRaw[]>> =>
  getEventbriteOrganizerEvents('club-voltaire-comedy-10799435555');

export default getVoltaire;
