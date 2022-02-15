import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import TextTheme from './components/TextTheme';
import HeadingTheme from './components/HeadingTheme';
import space from './space';
import TagTheme from './components/TagTheme';
import InputTheme from './components/InputTheme';

const theme = extendTheme({
  colors,
  components: {
    Text: TextTheme,
    Heading: HeadingTheme,
    Tag: TagTheme,
    Input: InputTheme,
    Editable: {
      baseStyle: {
        preview: {
          py: 0,
        },
        input: {
          py: 0,
        }
      }
    },
    Popover: {
      baseStyle: {
        content: {
          backgroundColor: 'white',
        },
        body: {
          px: 1 / 2,
          py: 1 / 3,
        },
        footer: {
          px: 1 / 2,
          py: 1 / 3,
        },
        header: {
          px: 1 / 2,
          py: 1 / 3,
        }
      },
      defaultProps: {
        gutter: 1 / 2,
      }
    }
  },
});

// override values
theme.components.Heading.sizes = {};
theme.space = space;
theme.components.Editable.baseStyle.preview.py = undefined;

console.log(theme.components.Popover.baseStyle({}));

export default theme;
