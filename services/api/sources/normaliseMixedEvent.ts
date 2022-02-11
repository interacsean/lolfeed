import { prop } from 'ramda';
import { ComEvent, Sources } from '../../events/types';
import { EvtRecord } from '../../database/events/types';
import normaliseComedyRepublicEvent from './comedyRepublic/normaliseComedyRepublicEvent';
import normaliseComicsLoungeEvent from './comicsLounge/normaliseComicsLoungeEvent';
import normaliseRubberChickenEvent from './rubberChicken/normaliseRubberChickenEvent';
import normaliseGeorgesBarEvent from './georgesBar/normaliseGeorgesBarEvent';
import normaliseRocheyEvent from './rochey/normaliseRocheyEvent';
import normaliseBobbiePeelsEvent from './bobbiePeels/normaliseBobbiePeelsEvent';
import normaliseDirtySecretsEvent from './dirtySecrets/normaliseDirtySecretsEvent';
import normaliseVoltaireEvent from './voltaire/normaliseVoltaireEvent';

const getIdMap: Record<Sources, (evt: any) => ComEvent | null> = {
  [Sources.BOBBIE_PEELS]: normaliseBobbiePeelsEvent,
  [Sources.COMEDY_REPUBLIC]: normaliseComedyRepublicEvent,
  [Sources.COMICS_LOUNGE]: normaliseComicsLoungeEvent,
  [Sources.DIRTY_SECRETS]: normaliseDirtySecretsEvent,
  [Sources.GEORGES_BAR]: normaliseGeorgesBarEvent,
  [Sources.ROCHEY]: normaliseRocheyEvent,
  [Sources.RUBBER_CHICKEN]: normaliseRubberChickenEvent,
  [Sources.VOLTAIRE]: normaliseVoltaireEvent,
  [Sources.GENERATED_GENERAL]: prop('rawEvent'),
  [Sources.GENERATED_BOBBY_PEELS]: prop('rawEvent'),
  [Sources.GENERATED_DIRTY_SECRETS]: prop('rawEvent'),
  [Sources.GENERATED_GEORGES_BAR]: prop('rawEvent'),
  [Sources.GENERATED_GUERILLA_RESISTANCE]: prop('rawEvent'),
  [Sources.GENERATED_HIGHLANDER]: prop('rawEvent'),
  [Sources.GENERATED_LAUGHS_AT_LANTERN]: prop('rawEvent'),
  [Sources.GENERATED_VOLTAIRE]: prop('rawEvent'),
}

const normaliseMixedEvent = (event: Pick<EvtRecord, 'source' | 'rawEvent'>): ComEvent => {
  if (!Sources[event.source] || !getIdMap[Sources[event.source]]) {
    throw new Error(`Unknown source when normalising rawEvent: ${event.source}`)
  }
  // @ts-ignore (should work if mapping is correct above)
  return (getIdMap[event.source])(event.rawEvent);
}


export default normaliseMixedEvent;
