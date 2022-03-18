import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { CmdClrEvtRaw } from './types';
import getEventbriteSeriesEvents from '../common/eventbrite/getEventbriteSeriesEvents';

const getComedyCellar = (): Promise<ApiErrorOr<CmdClrEvtRaw[]>> =>
  getEventbriteSeriesEvents('nothing-265736072747').then(
    (indEvs) =>
      indEvs?.map((indEv) => ({
        individualEventData: indEv,
      })) || [],
  );

export default getComedyCellar;
