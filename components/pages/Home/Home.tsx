import React from 'react';
import { NextPage } from 'next';
import { Box, Text, Select, Spinner } from '@chakra-ui/react';
import useEventTarget from '../../../utils/hooks/useEventTarget';
import { ComEventSummary } from '../../../services/events/types';
import { Tags } from '../../../services/events/tags/tags';
import tagTitles from '../../../services/events/tags/tagTitles';
import useEventFeed from '../../../services/events/useEventFeed';
import Layout from '../../layouts/Layout/Layout';
import EventCardEditable from '../../modules/EventCard/EventCardEditable';
import Card from '../../common/Card/Card';
import Hr from '../../common/Hr';
import { ComicRecord } from '../../../services/database/comics/types';
import isVisible from '../../../services/events/isVisible';

function useFilterEvents(
  events: ComEventSummary[],
  filters: { filterShowType: string | undefined },
) {
  return React.useMemo(
    () =>
      events.filter(
        (evt) =>
          isVisible(evt) &&
          (!filters.filterShowType ||
            ((evt.tags as string[]) || []).includes(filters.filterShowType)),
      ),
    [events, filters],
  );
}

const Home: NextPage<{ canEdit?: boolean; comicsList?: ComicRecord[] }> = (
  props,
) => {
  const comicsList = props.comicsList || [];

  const { events, setEvents, loading } = useEventFeed();
  const [filterShowType, setFilterShowType] = React.useState<
    string | undefined
  >(undefined);
  const [editing, setEditing] = React.useState<null | string>();

  const filteredEvents = useFilterEvents(events, { filterShowType });

  const onExit = React.useCallback((updatedEvent: ComEventSummary) => {
    setEvents((evts) =>
      evts.map((e) => (e.uid === updatedEvent.uid ? updatedEvent : e)),
    );
    setEditing(null);
  }, []);

  return (
    <Layout>
      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Text variant="heading" as="h1" mb={4}>
            Events
          </Text>
          <Box
            p={1}
            borderRadius={1000}
            border="1px solid"
            borderColor="guide.100"
          >
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
          <Box textAlign="center">
            <Spinner size="xl" thickness="3px" color="action.100" />
          </Box>
        ) : (
          filteredEvents.map((e, i) => {
            return (
              <Box mb={5} key={e.uid}>
                {i > 0 && <Hr mb={5} />}
                <EventCardEditable
                  comicsList={comicsList}
                  event={e}
                  isEditing={editing === e.uid}
                  enableEdit={props.canEdit}
                  onExit={onExit}
                  onEdit={setEditing}
                />
              </Box>
            );
          })
        )}
      </Card>
    </Layout>
  );
};

export default Home;
