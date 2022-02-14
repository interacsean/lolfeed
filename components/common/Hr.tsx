import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const Hr = (props: BoxProps) => {
  return (
    <Box
      borderBottomColor="black.20"
      borderWidth={0}
      borderBottomWidth={1}
      {...props}
    />
  );
};

export default Hr;
