import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import Text from './components/Text';
import Heading from './components/Heading';

const theme = extendTheme({
  colors,
  components: {
    Text,
    Heading,
  }
});

// clear values
theme.components.Heading.sizes = {};

export default theme;
