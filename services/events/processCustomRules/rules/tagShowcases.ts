import { getDay } from 'date-fns';
import { uniq } from 'ramda';
import anyAreTrue from '../../../../utils/flow/anyAreTrue';
import startsWithLower from '../../../../utils/string/startsWithLower';
import { EvtRecord } from '../../../database/events/types';
import { Sources } from '../../types';
import { Tags } from '../../tags/tags';
import containsLower from '../../../../utils/string/containsLower';

const ruleX = (evt: EvtRecord) => false;

const ruleRochey = (evt: EvtRecord) =>
  evt.source === Sources.ROCHEY &&
  evt.comEvent.title === 'Rochey Courtyard Comedy';

const ruleVoltaireSunday = (evt: EvtRecord) =>
  evt.source === Sources.VOLTAIRE &&
  startsWithLower('Sunday Night', evt.comEvent.title);

const ruleDirtySecrets = (evt: EvtRecord) =>
  evt.source === Sources.DIRTY_SECRETS &&
  [3, 4].includes(getDay(evt.comEvent.timestamp[0]));

const ruleComedyRepMainStage = (evt: EvtRecord) =>
  evt.source === Sources.COMEDY_REPUBLIC &&
  startsWithLower('main stage', evt.comEvent.title);

const ruleGeorgesWed = (evt: EvtRecord) =>
  evt.source === Sources.GEORGES_BAR &&
  containsLower('Comedy Wednesdays', evt.comEvent.title);

const tagShowcases = (evt: EvtRecord) => {
  if (
    anyAreTrue(
      [
        ruleRochey,
        ruleVoltaireSunday,
        ruleDirtySecrets,
        ruleComedyRepMainStage,
        ruleGeorgesWed,
      ],
      evt,
    )
  ) {
    return {
      ...evt,
      comEvent: {
        ...evt.comEvent,
        tags: uniq([...(evt.comEvent.tags || []), Tags.SHOWCASE]),
      },
    };
  }
  return evt;
};

export default tagShowcases;
