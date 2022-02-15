import space from '../space';

const TagTheme = {
  baseStyle: {
    closeButton: {
      marginEnd: `-${space[1/3]}`,
      marginStart: 1/6,
    }
  },
  sizes: {
    md: {
      container: {
        px: 1/2,
      },
    }
  },
  variants: {
    solid: {
      container: {
        backgroundColor: 'secondary.100',
        color: 'black',
      }
    },
  },
  defaultProps: {
    variant: 'solid',
  }
}

export default TagTheme;
