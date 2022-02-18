import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import space from './space';
import TextTheme from './components/TextTheme';
import HeadingTheme from './components/HeadingTheme';
import TagTheme from './components/TagTheme';
import InputTheme from './components/InputTheme';
import PopoverTheme from './components/PopoverTheme';
import EditableTheme from './components/EditableTheme';
import SelectTheme from './components/SelectTheme';

const theme = extendTheme({
  colors,
  components: {
    Text: TextTheme,
    Heading: HeadingTheme,
    Tag: TagTheme,
    Input: InputTheme,
    Editable: EditableTheme,
    Popover: PopoverTheme,
    Select: SelectTheme,
  },
  space,
});

// override values
theme.components.Heading.sizes = {};
theme.components.Editable.baseStyle.preview.py = undefined;

export default theme;
