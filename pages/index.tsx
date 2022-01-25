import useEventFeed from '../services/events/useEventFeed';
import { Box, Heading, Text, Img } from '@chakra-ui/react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import Layout from '../components/layouts/Layout';
import { getSpace } from '../theme/space';


const defaultImageSrc = '';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <Layout color="white.100">
      <Text variant="heading" as="h1">Events</Text>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : (
          events.map(e => (
            <Box mb={1} display="flex" backgroundColor="white.100" border="4px solid" borderColor="secondary.100" borderRadius={getSpace(1 / 3)}>
              <Box sx={{ minWidth: '150px' }} position="relative">
                <Img
                  src={e.imgSrc || defaultImageSrc}
                  objectFit="cover"
                  width={150}
                  height={150}
                  borderLeftRadius={getSpace(1 / 5)}
                />
                {e.price && (
                  <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>${e.price}</Text>
                )}
              </Box>
              <Box py={1 / 3} px={1 / 2}>
                <Heading variant="title">{e.title}</Heading>
                <Text variant="subTitle">{e.venue?.name}</Text>
                {e.timestamp[1] ? (
                  // todo: formatrange
                  <Text variant="detail">{format(e.timestamp[0], 'do MMM')} – {format(e.timestamp[1], 'do MMM yyyy')}</Text>
                ) : (
                  <Text variant="detail">{format(e.timestamp[0], 'do MMM yyyy h:mm a')}</Text>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Layout>
  )
}

export default Home;
