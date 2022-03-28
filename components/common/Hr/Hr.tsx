import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const Hr = (props: BoxProps) => {
  return (
    <Box
      borderBottomColor="guide.100"
      borderWidth={0}
      borderBottomWidth={2}
      {...props}
    />
  );
};

export default Hr;
