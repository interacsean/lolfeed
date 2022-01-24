import useEventFeed from '../services/events/useEventFeed';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { format } from 'date-fns';


const defaultImageSrc = '';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <Box px="bodyH" pt="bodyTop">
      <h3>Events</h3>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : (
          events.map(e => (
            <Box mb={1}>
              <Box>
                <img src={e.imgSrc || defaultImageSrc} />
              </Box>
              <Heading variant="heading">{e.title}</Heading>
              <Text variant="subTitle">{e.venue?.name}</Text>
              <Text variant="titleDetail">{format(e.timestamp, 'do MMM yyyy h:mm a')}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  )
}

export default Home;
