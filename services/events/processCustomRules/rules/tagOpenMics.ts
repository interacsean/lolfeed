import { EvtRecord } from '../../../database/events/types';
import { Sources } from '../../types';
import { mergeDeepLeft, mergeDeepRight } from 'ramda';
import { Tags } from '../../tags/tags';

const tagOpenMics = (evt: EvtRecord) => {
  if (evt.source === Sources.BOBBIE_PEELS && evt.comEvent.title === 'Free Comedy Upstairs at Bobbie Peels') {
    return mergeDeepRight(
      {
        comEvent: {
          tags: [Tags.OPEN_MIC]
        }
      },
      evt,
    );
  }
  return evt;
}

export default tagOpenMics;
