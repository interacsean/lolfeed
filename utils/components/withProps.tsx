import { FC } from 'react';

function withProps<P extends {}>(Comp: FC<P>, defaultProps: Partial<P>) {
  return (props: P) => <Comp {...defaultProps} {...props} />
}

export default withProps;
