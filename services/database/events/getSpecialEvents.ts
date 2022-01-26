
import getEvents from '../../database/events/getEvents';
import { ComEvent } from '../../events/types';
import normaliseMixedEvent from '../../api/sources/normaliseMixedEvent';

const getSpecialEvents = () =>  getEvents().then(
  (mixedEventData) => mixedEventData.map(normaliseMixedEvent)
).then(
  events => events.filter(e => e && (e.timestamp[1] || e.timestamp[0]) > Date.now()) as ComEvent[]
).then(
  events => events.sort(
    (a, b) => a.timestamp[0] - b.timestamp[0]
  )
)

export default getSpecialEvents;
