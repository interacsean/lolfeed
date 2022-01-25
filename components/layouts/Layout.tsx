import React from 'react';
import BodyBox from './BodyBox';
import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode,
};

const Layout = (props: Props) => {
  return (
    <>
      {/*<BodyBox as="header">*/}
      {/*</BodyBox>*/}
      <BodyBox backgroundColor="primary.100">
        <Box maxWidth="700px" margin="0 auto">
          {props.children}
        </Box>
      </BodyBox>
    </>
  );
};

export default Layout;
