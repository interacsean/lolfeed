import { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout';
import EventCard from '../../modules/EventCard/EventCard';
import React from 'react';
import EventCardEditable from '../../modules/EventCard/EventCardEditable';
import { ComEventSummary } from '../../../services/events/types';
import Card from '../../common/Card';
import Hr from '../../common/Hr';

const Home: NextPage<{ canEdit?: boolean }> = (props) => {
  const { events, setEvents, loading } = useEventFeed();

  const [ editing, setEditing ] = React.useState<null | string>();

  return (
    <Layout color="white.100">
      <Card>
        <Text variant="heading" as="h1" mb={1}>Events</Text>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : (
          events.map((e, i) =>
            <Box mb={2}>
              {i > 0 && <Hr mb={2} />}
              {
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
                    allowEdit={props.canEdit}
                    onEdit={() => setEditing(e.uid)}
                  />
                )
              }
              {}
            </Box>
          )
        )}
      </Card>
    </Layout>
  );
}

export default Home;
