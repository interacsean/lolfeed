import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import TextTheme from './components/TextTheme';
import HeadingTheme from './components/HeadingTheme';
import space from './space';
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
});

// override values
theme.components.Heading.sizes = {};
theme.space = space;
theme.components.Editable.baseStyle.preview.py = undefined;

console.log(theme.components.Select);

export default theme;
