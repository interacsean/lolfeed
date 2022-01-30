import { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout';
import EventCard from '../../modules/EventCard/EventCard';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <Layout color="white.100">
      <Text variant="heading" as="h1">Events</Text>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : events.map(e => {
          return <EventCard event={e} />
        })}
      </Box>
    </Layout>
  );
}

export default Home;
