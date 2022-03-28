import { ComEventSummary } from '../../../../domain/events/types';
import axios from 'axios';
import App from '../../../../config/App';

const saveEventOverrides = (event: ComEventSummary) => {
  return axios.post(`${App.apiUri}/event/${event.uid}`, event);
};

export default saveEventOverrides;
