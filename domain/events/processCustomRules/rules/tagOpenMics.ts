import { EvtRecord } from '../../../../api/services/database/events/types';
import { Sources } from '../../types';
import { startsWith, uniq } from 'ramda';
import { Tags } from '../../tags/tags';
import { getDay } from 'date-fns';
import anyAreTrue from '../../../../utils/flow/anyAreTrue';

const ruleBobbiePeels = (evt: EvtRecord) =>
  evt.source === Sources.BOBBIE_PEELS &&
  evt.comEvent.title === 'Free Comedy Upstairs at Bobbie Peels';

const ruleFreshFridayVoltaire = (evt: EvtRecord) =>
  evt.source === Sources.VOLTAIRE &&
  startsWith('Fresh Friday Comedy', evt.comEvent.title);

const ruleDirtySecretSundays = (evt: EvtRecord) =>
  evt.source === Sources.DIRTY_SECRETS &&
  getDay(evt.comEvent.timestamp[0]) === 0;

const rule50firstGeorges = (evt: EvtRecord) =>
  evt.source === Sources.GEORGES_BAR &&
  evt.comEvent.title.indexOf('50 first') !== -1;

const tagOpenMics = (evt: EvtRecord) => {
  if (
    anyAreTrue(
      [
        ruleBobbiePeels,
        ruleFreshFridayVoltaire,
        ruleDirtySecretSundays,
        rule50firstGeorges,
      ],
      evt,
    )
  ) {
    return {
      ...evt,
      comEvent: {
        ...evt.comEvent,
        tags: uniq([...(evt.comEvent.tags || []), Tags.OPEN_MIC]),
      },
    };
  }
  return evt;
};

export default tagOpenMics;
