import { EvtRecord } from '../../../database/events/types';
import { Sources } from '../../types';
import { startsWith, uniq } from 'ramda';
import { Tags } from '../../tags/tags';

const tagOpenMics = (evt: EvtRecord) => {
  if (
    (evt.source === Sources.BOBBIE_PEELS &&
      evt.comEvent.title === 'Free Comedy Upstairs at Bobbie Peels') ||
    (evt.source === Sources.VOLTAIRE &&
      startsWith('Fresh Friday Comedy', evt.comEvent.title))
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
