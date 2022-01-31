import React from 'react';

import { Box, Heading, Img, Text, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { getSpace } from '../../../theme/space';
import { ComEventSummary } from '../../../services/events/types';
import IconButton from '../../common/IconButton/IconButton';
import { lensPath, set } from 'ramda';
import saveEventOverrides from './saveEventOverrides';

type EventCardProps = {
  event: ComEventSummary,
  onExit?: () => void,
}

const defaultImageSrc = '/images/mic.jpg';

const EventCardEditable = ({ event: initEvent, ...props }: EventCardProps) => {
  const [ event, setEvent ] = React.useState(initEvent);
  const saveThenExitEdit = React.useCallback(
    () => {
      saveEventOverrides(event).then(
        props.onExit
      )
    },
    [props.onExit, event],
  );
  const setEventFieldVal = React.useCallback(
    (fieldPath: string[], val: string) => setEvent(
      prev => set(lensPath(fieldPath), val, prev)
    ),
    [],
  );
  const setEventField = React.useCallback(
    (fieldPath: string[]) => (val: string) => setEventFieldVal(fieldPath, val),
    [setEventFieldVal],
  );
  const sendEmptyIf = React.useCallback(
    (fn: ((val: string) => void), placeholder: string) => (val: string) => {
      fn(val === placeholder ? '' : val)
    },
    [],
  );

  console.log(event);

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
          src={event.imgSrc || defaultImageSrc}
          objectFit="cover"
          width={150}
          minHeight={150}
          maxHeight={165}
          borderLeftRadius={getSpace(1 / 5)}
          opacity={!event.imgSrc ? 0.1 : undefined}
        />
        {priceDesc ? (
          <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>{priceDesc}</Text>
        ) : null}
      </Box>
      <Box py={1 / 3} px={1 / 2}
           flex="1 0 0">
        <Box display="flex">
          <Heading variant="title" flex="1 0 0" editable minWidth="6em">
            <Editable
              defaultValue={event.title || '{title}'}
              onSubmit={sendEmptyIf(setEventField(['title']), '{title}')}
            >
              <EditablePreview display="block" />
              <EditableInput />
            </Editable>
          </Heading>
          <IconButton
            aria-label={'Save'}
            onClick={saveThenExitEdit}
            icon={CheckIcon}
          />
        </Box>
        <Text variant="subTitle" mb={1 / 4}>
          <Editable
            defaultValue={event.venueName || '{venueName}'}
            onSubmit={sendEmptyIf(setEventField(['venueName']), '{venueName}')}
          >
            <EditablePreview display="block" />
            <EditableInput />
          </Editable>
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1 / 4}>
          <Box flex="1 0 0" alignSelf="stretch">
            <Text variant="detail" mb={1 / 5}>
              {event.timestamp[1] ? (
                // todo: formatrange
                `${format(event.timestamp[0], 'EEEE do MMM')} – ${format(event.timestamp[1], 'EEEE do MMM yyyy')}`
              ) : (
                format(event.timestamp[0], 'EEEE do MMM yyyy h:mm a')
              )}
            </Text>
            <Text variant="content">
              <Editable
                defaultValue={event.description || '{description}'}
                onSubmit={sendEmptyIf(setEventField(['description']), '{description}')}
                aria-multiline
              >
                <EditablePreview display="block" />
                <EditableInput aria-multiline />
              </Editable>
            </Text>
          </Box>
          <Box display="flex" width={'auto'} justifyContent="end">
            {/*<IconButton*/}
            {/*  aria-label="View"*/}
            {/*  icon={ArrowForwardIcon}*/}
            {/*/>*/}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


export default EventCardEditable;
