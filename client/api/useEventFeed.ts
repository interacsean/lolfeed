import * as React from 'react';
import axios from 'axios';
import App from '../../config/App';
import { ComEventSummary } from '../../domain/events/types';
import { EventResponse } from '../../api/routes/event';

const useEventFeed = () => {
  const [loading, setLoading] = React.useState(false);
  const [events, setEvents] = React.useState<ComEventSummary[]>([]);

  const requestEvents = React.useCallback(() => {
    setLoading(true);
    axios
      .get<EventResponse>(`${App.apiUri}/event`)
      .then(({ data }) => {
        setEvents(data.events);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(function loadData() {
    requestEvents();
  }, []);

  return {
    loading,
    events,
    setEvents,
  };
};

export default useEventFeed;
