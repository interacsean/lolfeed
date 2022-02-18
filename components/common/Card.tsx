import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { getSpace } from '../../theme/space';

const Card = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      backgroundColor="white.100"
      px={5}
      py={4}
      borderRadius={'0.75rem'}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
