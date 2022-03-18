import { ComEvent, Sources } from '../../types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { CmdClrEvtRaw } from './types';

export const getComedyCellarId = (ce: CmdClrEvtRaw) =>
  getEventbriteEvtId('CLR', ce);

const normaliseComedyCellarEvent = (ce: CmdClrEvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('CLR', ce);

  if (!rest) return null;
  return {
    ...rest,
    source: Sources.COMEDY_IN_THE_CELLAR,
    venueName: 'St Kilda Cellars and Bottleshop',
  };
};

export default normaliseComedyCellarEvent;
