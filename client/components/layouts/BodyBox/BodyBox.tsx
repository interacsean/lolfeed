import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

const BodyBox = (props: BoxProps) => (
  <Box px={{ base: 'bodyHPadBase' }} pt="bodyTop" pb="bodyBottom" {...props} />
);

export default BodyBox;
