import { NextPage } from 'next';
import { Box, Text, Select } from '@chakra-ui/react';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout';
import EventCard from '../../modules/EventCard/EventCard';
import React from 'react';
import EventCardEditable from '../../modules/EventCard/EventCardEditable';
import { ComEventSummary } from '../../../services/events/types';
import Card from '../../common/Card';
import Hr from '../../common/Hr';
import { Tags } from '../../../services/events/tags/tags';
import tagTitles from '../../../services/events/tags/tagTitles';
import useEventTarget from '../../../utils/hooks/useEventTarget';

function useFilterEvents(
  events: ComEventSummary[],
  filters: {filterShowType: string | null}
) {
  return React.useMemo(
    () => events.filter(
      evt => (!filters.filterShowType || (evt.tags as string[] || []).includes(filters.filterShowType))
    ),
    [events, filters],
  );
}

const Home: NextPage<{ canEdit?: boolean }> = (props) => {
  const { events, setEvents, loading } = useEventFeed();
  const [ filterShowType, setFilterShowType ] = React.useState<string | undefined>(undefined);
  const [ editing, setEditing ] = React.useState<null | string>();
  
  const filteredEvents = useFilterEvents(events, { filterShowType });

  return (
    <Layout color="white.100">
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Text variant="heading" as="h1" mb={1}>Events</Text>
          <Box p={1 / 4} borderRadius={1000} border="1px solid" borderColor="black.10">
            <Select
              value={filterShowType}
              placeholder="Show type"
              onChange={useEventTarget(setFilterShowType)}
              border="none"
            >
              <option value={Tags.OPEN_MIC}>{tagTitles[Tags.OPEN_MIC]}</option>
              <option value={Tags.SHOWCASE}>{tagTitles[Tags.SHOWCASE]}</option>
            </Select>
          </Box>
        </Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : (
          filteredEvents.map((e, i) =>
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
