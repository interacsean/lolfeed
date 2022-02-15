import React from "react";
import {
  Popover,
  PopoverTrigger,
  Text,
  PopoverBody,
  PopoverContent,
  PopoverHeader,

} from '@chakra-ui/react';
import layers from '../../../theme/layers';

type Props = {
  children: string;
};

const ComicLink = (props: Props) => {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Text position="relative" zIndex={layers.foreground}>{props.children}</Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>...</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(ComicLink);
