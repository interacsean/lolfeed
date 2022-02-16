import React from 'react';
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
  IconProps,
} from '@chakra-ui/react';

type Props = Omit<IconButtonProps, 'icon'> & {
  icon: React.JSXElementConstructor<any>;
  iconProps?: IconProps;
};

const IconButton = (props: Props) => {
  const { icon: Icon, iconProps, ...iconButtonProps } = props;
  return (
    <ChakraIconButton
      {...iconButtonProps}
      variant="ghost"
      icon={<Icon fontSize="24px" color="action.100" {...iconProps} />}
    />
  );
};

export default IconButton;
