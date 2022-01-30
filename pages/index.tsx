import useEventFeed from '../services/events/useEventFeed';
import { IconButton, Box, Heading, Text, Img } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons/src/ArrowForward';
import { NextPage } from 'next';
import { format } from 'date-fns';
import Layout from '../components/layouts/Layout';
import { getSpace } from '../theme/space';

const defaultImageSrc = '/images/mic.jpg';

const Home: NextPage = () => {
  const { events, loading } = useEventFeed();

  return (
    <Layout color="white.100">
      <Text variant="heading" as="h1">Events</Text>
      <Box>
        {loading ? (
          <Box textAlign="center">Loading...</Box>
        ) : events.map(e => {
          const price = typeof e.price === 'number' ? [e.price] : e.price;
          const priceDesc = !price ? null
            : typeof price[1] === 'string'
              ? price[1]
            : typeof price[1] === 'number'
              ? `$${price[0]}-${price[1]}`
            : price[0] === 0
              ? null
            : `$${price[0]}`;
          return (
            <Box
              mb={1}
              display="flex"
              alignItems="stretch"
              backgroundColor="white.100"
              border="4px solid"
              borderColor="secondary.100"
              borderRadius={getSpace(1 / 3)}
            >
              <Box sx={{ minWidth: '150px' }} position="relative">
                <Img
                  src={e.imgSrc || defaultImageSrc}
                  objectFit="cover"
                  width={150}
                  minHeight={150}
                  maxHeight={165}
                  borderLeftRadius={getSpace(1 / 5)}
                  opacity={!e.imgSrc ? 0.1 : undefined}
                />
                {priceDesc ? (
                  <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>{priceDesc}</Text>
                ) : null}
              </Box>
              <Box py={1 / 3} px={1 / 2}
                   flex="1 0 0">
                <Heading variant="title">{e.title}</Heading>
                <Text variant="subTitle" mb={1 / 4}>{e.venue?.name}</Text>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1 / 4}>
                  <Box flex="1 0 0" alignSelf="stretch">
                    <Text variant="detail" mb={1 / 5}>
                      {e.timestamp[1] ? (
                        // todo: formatrange
                        `${format(e.timestamp[0], 'EEEE do MMM')} – ${format(e.timestamp[1], 'EEEE do MMM yyyy')}`
                      ) : (
                        format(e.timestamp[0], 'EEEE do MMM yyyy h:mm a')
                      )}
                    </Text>
                    {e.description && (
                        <Text variant="content">{e.description}</Text>
                    )}
                  </Box>
                  <Box display="flex" width={'auto'} justifyContent="end">
                    <IconButton
                      icon={<ArrowForwardIcon />}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )})
        }
      </Box>
    </Layout>
  );
}

export default Home;
