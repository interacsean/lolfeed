import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { RsTBarEvtRaw } from './types';

const getRaiseTheBar = (): Promise<ApiErrorOr<RsTBarEvtRaw[]>> =>
  getEventbriteOrganizerEvents('hosted-by-amna-bee-and-sam-serna-34245418569');

export default getRaiseTheBar;
