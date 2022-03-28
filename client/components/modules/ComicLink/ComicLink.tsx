import React from 'react';
import {
  Popover,
  PopoverTrigger,
  Text,
  Box,
  Flex,
  PopoverBody,
  PopoverContent,
} from '@chakra-ui/react';
import { ComicRecord } from '../../../../domain/comics/types';

type Props = {
  comic: ComicRecord | string;
};

const ComicLink = (props: Props) => {
  const comicName =
    typeof props.comic === 'string' ? props.comic : props.comic?.name;

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Text variant="detail_featured" position="relative">
          {comicName}
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Flex>
            <Box>[img]</Box>
            <Box pl={1 / 2}>
              <Text variant="contentTitle" mb={1 / 3}>
                {comicName}
              </Text>
              <Text variant="detail">
                We're still gathering info about this comic
              </Text>
            </Box>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(ComicLink);
