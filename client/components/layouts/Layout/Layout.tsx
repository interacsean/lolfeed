import React from 'react';
import { Box, HStack, Container, PropsOf } from '@chakra-ui/react';
import Link from '../../common/Link/Link';

type Props = {
  children: React.ReactNode;
};

const NavLink = ({ children, ...props }: PropsOf<typeof Link>) => (
  <Link {...props} px={3} py={3}>
    {children}
  </Link>
);

const Layout = (props: Props) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box as="header" backgroundColor="secondary.100">
        <Container>
          <HStack as="nav" maxWidth="700px" margin="0 auto">
            <NavLink href="/">Shows</NavLink>
            <NavLink href="/open-mics">Open Mics</NavLink>
            <NavLink href="/map">Map</NavLink>
            <NavLink href="/comics">Comics</NavLink>
          </HStack>
        </Container>
      </Box>
      <Box
        flex="1 0 0"
        pt="bodyTopPad"
        pb="bodyBottomPad"
        backgroundColor="primary.100"
      >
        <Container>{props.children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
