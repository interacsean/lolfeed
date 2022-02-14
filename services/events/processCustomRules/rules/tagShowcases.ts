import { EvtRecord } from '../../../database/events/types';
import { Sources } from '../../types';
import { startsWith, uniq } from 'ramda';
import { Tags } from '../../tags/tags';

const tagOpenMics = (evt: EvtRecord) => {
  if (
    (evt.source === Sources.ROCHEY && evt.comEvent.title === 'Rochey Courtyard Comedy')
    || (evt.source === Sources.VOLTAIRE && startsWith('Sunday Night', evt.comEvent.title))
  ) {
    return {
      ...evt,
      comEvent: {
        ...evt.comEvent,
        tags: uniq([
          ...(evt.comEvent.tags || []),
          Tags.SHOWCASE,
        ])
      }
    }
  }
  return evt;
}

export default tagOpenMics;
