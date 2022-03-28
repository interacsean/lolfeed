const TagTheme = {
  variants: {
    solid: {
      container: {
        backgroundColor: 'secondary.100',
        color: 'black',
      },
    },
    subtle: {
      container: {
        backgroundColor: 'white.90',
        color: 'black',
      },
    },
  },
  defaultProps: {
    variant: 'solid',
  },
};

export default TagTheme;
