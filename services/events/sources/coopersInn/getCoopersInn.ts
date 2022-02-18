import { CprInnEvtRaw } from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getTryBookingEvents from '../common/trybooking/getTryBookingEvents';
import getTryBookingEvtId from '../common/trybooking/getTryBookingEvtId';

export const coopersInnTrybookingEid = '684332';

export const getCoopersInnId = (ev: CprInnEvtRaw) => getTryBookingEvtId('CPI', ev);

const getCoopersInn = (): Promise<ApiErrorOr<CprInnEvtRaw[]>> =>
  getTryBookingEvents(coopersInnTrybookingEid);

export default getCoopersInn;

