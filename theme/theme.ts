import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import TextTheme from './components/TextTheme';
import HeadingTheme from './components/HeadingTheme';
import space from './space';

const theme = extendTheme({
  colors,
  components: {
    Text: TextTheme,
    Heading: HeadingTheme,
  },
});

// override values
theme.components.Heading.sizes = {};
theme.space = space;

export default theme;
