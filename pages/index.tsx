import useEventFeed from '../services/events/useEventFeed';
import { Box, Heading, Text, Img } from '@chakra-ui/react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import Layout from '../components/layouts/Layout';


const defaultImageSrc = '';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <Layout>
      <Text variant="heading" as="h1">Events</Text>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : (
          events.map(e => (
            <Box mb={1} display="flex">
              <Box mr={1/2}>
                <Img src={e.imgSrc || defaultImageSrc} objectFit="cover" width={150} height={150} />
              </Box>
              <Box>
                <Heading variant="title">{e.title}</Heading>
                <Text variant="subTitle">{e.venue?.name}</Text>
                <Text variant="detail">{format(e.timestamp, 'do MMM yyyy h:mm a')}</Text>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Layout>
  )
}

export default Home;
