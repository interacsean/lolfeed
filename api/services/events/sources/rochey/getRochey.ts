import { RocheyEvtRaw } from './types';
import { ApiErrorOr } from '../../../../../utils/api/ApiErrorOr';
import getTryBookingEvents from '../common/trybooking/getTryBookingEvents';
import getTryBookingEvtId from '../common/trybooking/getTryBookingEvtId';

export const rocheyTrybookingEid = '686198';

export const getRocheyId = (ev: RocheyEvtRaw) => getTryBookingEvtId('RCY', ev);

const getRochey = (): Promise<ApiErrorOr<RocheyEvtRaw[]>> =>
  getTryBookingEvents(rocheyTrybookingEid);

export default getRochey;
