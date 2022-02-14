import { Box, Heading, Img, Text } from '@chakra-ui/react';
import { ArrowForwardIcon, EditIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import Tag from '../../common/Tag/Tag';
import { getSpace } from '../../../theme/space';
import { ComEventSummary } from '../../../services/events/types';
import IconButton from '../../common/IconButton/IconButton';
import renderDate from '../../../utils/date/renderDate';

type EventCardProps = {
  event: ComEventSummary,
  allowEdit?: boolean,
  onEdit?: () => void,
}

const defaultImageSrc = '/images/mic.jpg';

const EventCard = ({ event, ...props }: EventCardProps) => {
  const price = typeof event.price === 'number' ? [event.price] : event.price;
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
      display="flex"
      alignItems="stretch"
    >
      <Box
        sx={{ minWidth: '150px' }}
        position="relative"
        display="flex"
        alignItems="stretch"
      >
        <Img
          src={event.imgSrc || defaultImageSrc}
          objectFit="cover"
          width={150}
          minHeight={150}
          maxHeight={180}
          opacity={!event.imgSrc ? 0.1 : undefined}
        />
        {priceDesc ? (
          <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>{priceDesc}</Text>
        ) : null}
      </Box>
      <Box py={1 / 3} px={1 / 2}
           flex="1 0 0">
        {props.allowEdit && (<Text variant="detail">{event.uid}</Text>)}
        <Box display="flex">
          <Heading variant="title" flex="1 0 0">{event.title}</Heading>
          {props.allowEdit && (
            <IconButton
              onClick={props.onEdit}
              aria-label={'Edit'}
              icon={EditIcon}
            />
          )}
        </Box>
        <Text variant="subTitle" mb={1 / 4}>{event.venueName}</Text>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1 / 4}>
          <Box flex="1 0 0" alignSelf="stretch">
            <Text variant="detail" mb={1 / 5}>
              {renderDate(event.timestamp, event.timestampPrecision, event.timezone)}
            </Text>
            {event.description && (
              <Text variant="content">{event.description}</Text>
            )}
            {event.tags && (
              <Box>
                {event.tags.map(
                  t => <Tag tag={t} />
                )}
              </Box>
            )}
          </Box>
          <Box display="flex" width={'auto'} justifyContent="end">
            <IconButton
              ariaLabel="View"
              icon={ArrowForwardIcon}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


export default EventCard;
