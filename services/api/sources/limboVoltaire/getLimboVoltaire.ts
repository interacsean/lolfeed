import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { LmbVltEvtRaw } from './types';

const getLimboVoltaire = (): Promise<ApiErrorOr<LmbVltEvtRaw[]>> =>
  getEventbriteOrganizerEvents('dougie-baldwin-33856513155');

export default getLimboVoltaire;
