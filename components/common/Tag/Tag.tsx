import React from 'react';
import { Tag as ChakraTag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { Tags } from '../../../services/events/tags/tags';
import tagTitles from '../../../services/events/tags/tagTitles';

type Props = {
  tag: Tags;
  removable?: boolean;
  onRemove?: () => void;
};

const Tag = (props: Props) => {
  const tagTitle = tagTitles[props.tag];
  return tagTitle ? (
    <ChakraTag>
      <TagLabel>
        {tagTitle}
      </TagLabel>
      {props.removable && (
        <TagCloseButton onClick={props.onRemove} />
      )}
    </ChakraTag>
  ) : null;
};

export default Tag;
