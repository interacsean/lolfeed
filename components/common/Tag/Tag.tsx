import React from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';
import { Tags } from '../../../services/events/tags/tags';
import tagTitles from '../../../services/events/tags/tagTitles';
import { CloseIcon } from '@chakra-ui/icons';
import IconButton from '../IconButton/IconButton';

type Props = {
  tag: Tags;
  removable?: boolean;
  onRemove?: () => void;
};

const Tag = (props: Props) => {
  const tagTitle = tagTitles[props.tag];
  return tagTitle ? (
    <ChakraTag>
      {tagTitle}
      {props.removable && (
        <IconButton
          aria-label="Remove"
          icon={CloseIcon}
          onClick={props.onRemove}
          iconProps={{ fontSize: "16px" }}
          h="1.2em"
          minW="1.2em"
          mx={0}
        />
      )}
    </ChakraTag>
  ) : null;
};

export default Tag;
