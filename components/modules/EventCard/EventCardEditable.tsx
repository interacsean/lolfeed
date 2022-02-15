import React from 'react';

import { Box, Heading, Img, Text, Editable, EditableInput, EditablePreview, LinkBox } from '@chakra-ui/react';
import { ArrowForwardIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { getSpace } from '../../../theme/space';
import { ComEventSummary } from '../../../services/events/types';
import IconButton from '../../common/IconButton/IconButton';
import { lensPath, set } from 'ramda';
import saveEventOverrides from './saveEventOverrides';
import renderDate from '../../../utils/date/renderDate';
import layers from '../../../theme/layers';
import { LinkOverlay } from '../../common/Link/Link';
import Tag from '../../common/Tag/Tag';
import { Tags } from '../../../services/events/tags/tags';

type EventCardProps = {
  event: ComEventSummary,
  onExit?: (event: ComEventSummary) => void,
  onEdit?: () => void;
  isEditing?: boolean;
  enableEdit?: boolean;
}

const defaultImageSrc = '/images/mic.jpg';

const EventCardEditable = ({ event: initEvent, ...props }: EventCardProps) => {
  const [ event, setEvent ] = React.useState(initEvent);
  const saveThenExitEdit = React.useCallback(
    () => {
      saveEventOverrides(event).then(
        () => props.onExit?.(event)
      )
    },
    [props.onExit, event],
  );
  const cancelEdit = React.useCallback(
    () => {
      setEvent(initEvent);
      props.onExit?.(initEvent)
    },
    [initEvent],
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
  const removeTag = React.useCallback(
    (tagToRemove: Tags) => () => {
      setEvent(ce => ({
        ...ce,
        tags: (ce.tags || []).filter(t => t !== tagToRemove)
      }));
    },
    [],
  );

  const price = typeof event.price === 'number' ? [event.price] : event.price;
  const priceDesc = !price ? null
    : typeof price[1] === 'string'
      ? price[1]
      : typeof price[1] === 'number'
        ? `$${price[0]}-${price[1]}`
        : price[0] === 0
          ? null
          : `$${price[0]}`;

  const Wrapper = props.isEditing ? Box : LinkBox;
  const TitleWrapper = props.isEditing ? Box : LinkOverlay;

  return (
    <Wrapper>
      <Box
        display="flex"
        alignItems="stretch"
      >
        <Box sx={{ minWidth: '150px' }} position="relative">
          <Img
            src={event.imgSrc || defaultImageSrc}
            objectFit="cover"
            width={150}
            minHeight={150}
            maxHeight={165}
            opacity={!event.imgSrc ? 0.1 : undefined}
          />
          {priceDesc ? (
            <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>{priceDesc}</Text>
          ) : null}
        </Box>
        <Box
          py={1 / 3}
          px={1 / 2}
          flex="1 0 0"
        >
          <Box display="flex">
            <TitleWrapper href={(props.isEditing ? undefined : event.orderLink) || undefined} isExternal>
              <Heading variant="title" flex="1 0 0" mb="0.25em" minWidth="6em">
                <Editable
                  isDisabled={!props.isEditing}
                  defaultValue={event.title || (props.isEditing ? '{title}' : undefined)}
                  onSubmit={sendEmptyIf(setEventField(['title']), '{title}')}
                >
                  <EditablePreview display="block" />
                  <EditableInput as="textarea" />
                </Editable>
              </Heading>
            </TitleWrapper>
            {props.isEditing ? (
              <>
                <IconButton
                  aria-label={'Save'}
                  onClick={saveThenExitEdit}
                  icon={CheckIcon}
                />
                <IconButton
                  aria-label={'Cancel'}
                  iconProps={{ fontSize: '18px' }}
                  onClick={cancelEdit}
                  icon={CloseIcon}
                />
              </>
              ) : (
                props.enableEdit && (
                <IconButton
                  zIndex={layers.foreground}
                  onClick={props.onEdit}
                  aria-label={'Edit'}
                  icon={EditIcon}
                />
              )
            )}
          </Box>
          <Text variant="subTitle" mb={1 / 4}>
            <Editable
              isDisabled={!props.isEditing}
              defaultValue={event.venueName || (props.isEditing ? '{venueName}' : undefined)}
              onSubmit={sendEmptyIf(setEventField(['venueName']), '{venueName}')}
            >
              <EditablePreview display="block" />
              <EditableInput as="textarea" />
            </Editable>
          </Text>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1 / 4}>
            <Box flex="1 0 0" alignSelf="stretch">
              <Text variant="detail" mb={1 / 5}>
                {renderDate(event.timestamp, event.timestampPrecision, event.timezone)}
              </Text>
              <Text variant="content" my="0.75em">
                <Editable
                  isDisabled={!props.isEditing}
                  defaultValue={event.description || (props.isEditing ? '{description}' : undefined)}
                  onSubmit={sendEmptyIf(setEventField(['description']), '{description}')}
                >
                  <EditablePreview display="block" />
                  <EditableInput as="textarea" />
                </Editable>
              </Text>
              {event.tags && (
                <Box>
                  {event.tags.map(
                    t => <Tag
                      tag={t}
                      removable={props.isEditing}
                      onRemove={removeTag(t)}
                    />
                  )}
                  {props.isEditing && (
                    '[add tag]'
                  )}
                </Box>
              )}
            </Box>
            <Box display="flex" width={'auto'} justifyContent="end">
              <IconButton
                aria-label="View"
                iconProps={{ fontSize: "32px" }}
                icon={ArrowForwardIcon}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}


export default EventCardEditable;
