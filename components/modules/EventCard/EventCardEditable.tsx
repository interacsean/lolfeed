import React from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Img,
  LinkBox,
  Select,
  Text,
} from '@chakra-ui/react';
import {
  ArrowForwardIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { ComEventSummary } from '../../../services/events/types';
import IconButton from '../../common/IconButton/IconButton';
import renderDate from '../../../utils/date/renderDate';
import layers from '../../../theme/layers';
import { LinkOverlay } from '../../common/Link/Link';
import Tag from '../../common/Tag/Tag';
import useEventCardLogic from './useEventCardLogic';
import ComicLink from '../ComicLink';
import ComicAutocomplete from './ComicAutocomplete';

export type EventCardProps = {
  comicsList: string[];
  event: ComEventSummary;
  onExit: (event: ComEventSummary) => void;
  onEdit: (uid: string) => void;
  isEditing?: boolean;
  enableEdit?: boolean;
};

const defaultImageSrc = '/images/mic.jpg';

const EventCardEditable = (props: EventCardProps) => {
  const {
    addTag,
    cancelEdit,
    event,
    saveThenExitEdit,
    setEventField,
    sendEmptyIf,
    removeTag,
    newTagOptions,
    approvalOptions,
    onStatusChange,
    addComic,
  } = useEventCardLogic(props);

  const price = typeof event.price === 'number' ? [event.price] : event.price;
  const priceDesc = !price
    ? null
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
      <Box display="flex" alignItems="stretch">
        <Box sx={{ minWidth: '150px' }} position="relative">
          <Img
            src={event.imgSrc || defaultImageSrc}
            objectFit="cover"
            width={150}
            minHeight={150}
            maxHeight={165}
            opacity={!event.imgSrc ? 0.1 : undefined}
          />
          <Box position="absolute" top={1 / 2} right={1 / 2}></Box>
          {priceDesc ? (
            <Text variant="tag" position="absolute" left={1 / 3} bottom={1 / 4}>
              {priceDesc}
            </Text>
          ) : null}
        </Box>
        <Box py={1 / 3} px={1 / 2} flex="1 0 0">
          <Box display="flex">
            <Box flex="1 0 0">
              {props.isEditing && (
                <Box display="flex" alignItems="center">
                  <Select
                    size="sm"
                    value={event.approval}
                    placeholder={`(${event.approval || 'select'})`}
                    onChange={onStatusChange}
                  >
                    {approvalOptions.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </Select>
                  {props.isEditing && (
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
                  )}
                </Box>
              )}
              <TitleWrapper
                href={
                  (props.isEditing ? undefined : event.orderLink) || undefined
                }
                isExternal
              >
                <Heading variant="title" mb="0.25em" minWidth="6em">
                  <Editable
                    isDisabled={!props.isEditing}
                    defaultValue={
                      event.title || (props.isEditing ? '{title}' : undefined)
                    }
                    onSubmit={sendEmptyIf(setEventField(['title']), '{title}')}
                  >
                    <EditablePreview display="block" />
                    <EditableInput as="textarea" />
                  </Editable>
                </Heading>
              </TitleWrapper>
            </Box>
            {!props.isEditing && props.enableEdit && (
              <IconButton
                zIndex={layers.foreground}
                onClick={() => props.onEdit(props.event.uid)}
                aria-label={'Edit'}
                icon={EditIcon}
              />
            )}
          </Box>
          <Text variant="subTitle" mb={1 / 4}>
            <Editable
              isDisabled={!props.isEditing}
              defaultValue={
                event.venueName || (props.isEditing ? '{venueName}' : undefined)
              }
              onSubmit={sendEmptyIf(
                setEventField(['venueName']),
                '{venueName}',
              )}
            >
              <EditablePreview display="block" />
              <EditableInput as="textarea" />
            </Editable>
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1 / 4}
          >
            <Box flex="1 0 0" alignSelf="stretch">
              <Text variant="detail" mb={1 / 5}>
                {renderDate(
                  event.timestamp,
                  event.timestampPrecision,
                  event.timezone,
                )}
              </Text>
              <Text variant="content" my="0.75em">
                <Editable
                  isDisabled={!props.isEditing}
                  defaultValue={
                    event.description ||
                    (props.isEditing ? '{description}' : undefined)
                  }
                  onSubmit={sendEmptyIf(
                    setEventField(['description']),
                    '{description}',
                  )}
                >
                  <EditablePreview display="block" />
                  <EditableInput as="textarea" />
                </Editable>
              </Text>
              <Box>
                {(!!event.comicsHeadline?.length || props.isEditing) && (
                  <>
                    <Text variant="detail" as="span">
                      Headliner:
                    </Text>
                    {(event.comicsHeadline || []).map((c) => (
                      <ComicLink>{c}</ComicLink>
                    ))}
                    {props.isEditing && (
                      <ComicAutocomplete
                        comics={props.comicsList}
                        onChoose={addComic('comicsHeadline')}
                      />
                    )}
                  </>
                )}
                {(!!event.comicsSupport?.length || props.isEditing) && (
                  <>
                    <Text variant="detail" as="span">
                      Supporting:
                    </Text>
                    {(event.comicsSupport || []).map((c) => (
                      <ComicLink>{c}</ComicLink>
                    ))}
                    {props.isEditing && (
                      <ComicAutocomplete
                        comics={props.comicsList}
                        onChoose={addComic('comicsSupport')}
                      />
                    )}
                  </>
                )}
                {(!!event.comicsFeatured?.length || props.isEditing) && (
                  <>
                    <Text variant="detail" as="span">
                      Featuring:
                    </Text>
                    {(event.comicsFeatured || []).map((c) => (
                      <ComicLink>{c}</ComicLink>
                    ))}
                    {props.isEditing && (
                      <ComicAutocomplete
                        comics={props.comicsList}
                        onChoose={addComic('comicsFeatured')}
                      />
                    )}
                  </>
                )}
              </Box>
              {(event.tags || props.isEditing) && (
                <HStack wrap="wrap">
                  {(event.tags || []).map((t) => (
                    <Tag
                      tag={t}
                      removable={props.isEditing}
                      onRemove={removeTag(t)}
                    />
                  ))}
                  {props.isEditing && (
                    <Box display="inline-block">
                      <Select
                        size="sm"
                        onChange={addTag}
                        placeholder="(add tag)"
                      >
                        {newTagOptions.map((t) => (
                          <option value={t}>{t}</option>
                        ))}
                      </Select>
                    </Box>
                  )}
                </HStack>
              )}
            </Box>
            {!props.isEditing && (
              <Box display="flex" width={'auto'} justifyContent="end">
                <IconButton
                  aria-label="View"
                  iconProps={{ fontSize: '32px' }}
                  icon={ArrowForwardIcon}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default React.memo(EventCardEditable);
