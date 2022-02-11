import axios from 'axios';

const getEventbriteOrganizerEvents = (organizerPath: string) => axios.get(
  `https://www.eventbrite.com.au/o/${organizerPath}`
).then
(({ data }) => {
  return JSON.parse(data.match(/window\.__SERVER_DATA__ = ({.*?});[\r\n]/)?.[1])?.jsonld?.[1];

});

export default getEventbriteOrganizerEvents;
