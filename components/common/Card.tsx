import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { getSpace } from '../../theme/space';

const Card = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      backgroundColor="white.100"
      px={2}
      py={1}
      borderRadius={getSpace(1 / 3)}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
