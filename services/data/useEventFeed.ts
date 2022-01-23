import React from 'react';
import axios from 'axios';
import App from '../../config/App';
import { Event, EventSummary } from './types';
import sampleEvents from './sampleEvents';

const useEventFeed = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ events, setEvents ] = React.useState<EventSummary[]>([]);

  const requestEvents = React.useCallback(
    () => {
      setLoading(true);
      setTimeout(() => {
        setEvents(sampleEvents);
        setLoading(false);
      }, 500)
      return;
      // axios.get(`${App.apiUri}/`).then(
      //   ({ data }) => {
      //
      //   }
      // )
    },
    [],
  );

  React.useEffect(
    function loadData() {
      requestEvents();
    },
    [],
  );

  return {
    loading,
    events,
  }
}

export default useEventFeed;
