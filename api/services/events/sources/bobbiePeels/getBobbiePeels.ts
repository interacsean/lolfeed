import { ApiErrorOr } from '../../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { BbiPlsEvtRaw } from './types';

const getBobbiePeels = (): Promise<ApiErrorOr<BbiPlsEvtRaw[]>> =>
  getEventbriteOrganizerEvents('aidan-jones-31916269863');

export default getBobbiePeels;
