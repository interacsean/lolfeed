import React from 'react';
import { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout';
import EventCard from '../../modules/EventCard/EventCard';
import EventCardEditable from '../../modules/EventCard/EventCardEditable';
import { ComEventSummary } from '../../../services/events/types';

const Admin: NextPage = () => {
  const { events, setEvents, loading } = useEventFeed();

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
              onExit={(updatedEvent: ComEventSummary) => {
                setEvents(evts => evts.map(
                  e => e.uid === updatedEvent.uid ? updatedEvent : e
                ))
                setEditing(null)
              }}
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