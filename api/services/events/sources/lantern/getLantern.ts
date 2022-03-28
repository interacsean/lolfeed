import { ApiErrorOr } from '../../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { LafLntEvtRaw } from './types';

const getLantern = (): Promise<ApiErrorOr<LafLntEvtRaw[]>> =>
  getEventbriteOrganizerEvents('gavin-sempel-32347708943');

export default getLantern;
