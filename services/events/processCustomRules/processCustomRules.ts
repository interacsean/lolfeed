import { EvtRecord } from '../../database/events/types';
import tagOpenMics from './rules/tagOpenMics';

type Rule = (evt: EvtRecord) => EvtRecord;

const rules: Rule[] = [
  tagOpenMics,
];

const processCustomRules = (evt: EvtRecord) => {
  return rules.reduce(
    (workingEvent, rule) => rule(workingEvent),
    evt,
  );
}

export default processCustomRules;
