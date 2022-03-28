import React from 'react';

type Props = {
  condition: boolean;
  wrapper: React.FC;
  children: React.ReactNode;
};

const ConditionalWrapper = (props: Props) => {
  return props.condition ? (
    <props.wrapper>{props.children}</props.wrapper>
  ) : (
    <>{props.children}</>
  );
};

export default ConditionalWrapper;
