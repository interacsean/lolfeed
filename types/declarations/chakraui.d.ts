import * as chakraUiReact from '@chakra-ui/react';
import { ComponentWithAs } from '@reach/utils';

declare module '@chakra-ui/react' {
  interface ComponentWithVariant {
    variant?: string;
  }
  interface MyTextProps extends ComponentWithVariant, chakraUiReact.TextProps {}
  const Text: ComponentWithAs<'p', MyTextProps>;
}
