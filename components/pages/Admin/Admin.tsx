import React from 'react';
import { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout';
import EventCard from '../../modules/EventCard/EventCard';
import EventCardEditable from '../../modules/EventCard/EventCardEditable';

const Admin: NextPage = () => {
  const { events, loading } = useEventFeed();

  const [ editing, setEditing ] = React.useState<null | string>();

  return (
    <Layout color="white.100">
      <Text variant="heading" as="h1">Events</Text>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : events.map(e =>
          editing === e.uid ? (
            <EventCardEditable
              event={e}
              onEdit={() => setEditing(e.uid)}
            />
          ) : (
            <EventCard
              event={e}
              allowEdit
              onEdit={() => setEditing(e.uid)}
            />
          )
        )}
      </Box>
    </Layout>
  );
}

export default Admin;
