import { ComEvent } from '../../../../domain/events/types';
import { EvtRecord } from '../../database/events/types';
import { eventSources } from './eventSources';

const normaliseMixedEvent = (
  event: Pick<EvtRecord, 'source' | 'rawEvent'>,
): ComEvent => {
  const foundSource = eventSources.find((es) => es.source === event.source);
  if (!foundSource) {
    throw new Error(
      `Unknown source when normalising rawEvent: ${event.source}`,
    );
  }
  // @ts-ignore (should work if eventSources mapping is correct)
  return foundSource.normalise(event.rawEvent);
};

export default normaliseMixedEvent;
