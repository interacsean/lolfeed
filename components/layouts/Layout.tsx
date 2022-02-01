import React from 'react';
import { Box, HStack, Container, PropsOf } from '@chakra-ui/react';
import Link from '../common/Link/Link';

type Props = {
  children: React.ReactNode,
};

const NavLink = ({ children, ...props }: PropsOf<typeof Link>) => (
  <Link {...props} px={1 / 2} py={1 / 2}>{children}</Link>
)

const Layout = (props: Props) => {
  return (
    <>
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
      <Box  pt="bodyTopPad" pb="bodyBottomPad" backgroundColor="primary.100">
        <Container>
          {props.children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
