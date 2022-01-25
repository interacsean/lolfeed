import React from 'react';
import BodyBox from './BodyBox';

type Props = {
  children: React.ReactNode,
};

const Layout = (props: Props) => {
  return (
    <>
      {/*<BodyBox as="header">*/}
      {/*</BodyBox>*/}
      <BodyBox>
        {props.children}
      </BodyBox>
    </>
  );
};

export default Layout;
