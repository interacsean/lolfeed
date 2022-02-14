import React from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';
import { Tags } from '../../../services/events/tags/tags';
import tagTitles from '../../../services/events/tags/tagTitles';

type Props = {
  tag: Tags
};

const Tag = (props: Props) => {
  const tagTitle = tagTitles[props.tag];
  return tagTitle ? (
    <ChakraTag>{tagTitle}</ChakraTag>
  ) : null;
};

export default Tag;
