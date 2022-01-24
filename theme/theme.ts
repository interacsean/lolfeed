import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import Text from './components/Text';
import Heading from './components/Heading';
import space from './space';

const theme = extendTheme({
  colors,
  components: {
    Text,
    Heading,
  },
});

// override values
theme.components.Heading.sizes = {};
theme.space = space;

export default theme;
