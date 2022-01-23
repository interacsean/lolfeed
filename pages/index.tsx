import useEventFeed from '../services/events/useEventFeed';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';


const defaultImageSrc = '';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <>
      <h3>Events</h3>
      <Box>
        {loading ? (
          'loading!'
        ) : (
          events.map(e => (
            <Box>
              <Box>
                <img src={e.imgSrc || defaultImageSrc} />
              </Box>
              <Heading variant="heading">{e.title}</Heading>
              <Text variant="subTitle">{e.venue?.name}</Text>
            </Box>
          ))
        )}
      </Box>
    </>
  )
}

export default Home;
