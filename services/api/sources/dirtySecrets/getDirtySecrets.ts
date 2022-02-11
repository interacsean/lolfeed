import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/getEventbriteOrganizerEvents';
import { DtyScrEvtRaw } from './types';

const getDirtySecrets = (): Promise<ApiErrorOr<DtyScrEvtRaw[]>> =>
  getEventbriteOrganizerEvents('caz-reitops-dirty-secrets-30555691016');

export default getDirtySecrets;
