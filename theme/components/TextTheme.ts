import fontWeights from '../fontWeights';
import { getSpace } from '../space';

const getFontSize = (n: number) =>
  getSpace(n, true, 1.22);

const TextTheme = {
  variants: {
    heading: {
      fontSize: getFontSize(2),
      fontWeight: fontWeights.bold,
      lineHeight: 1.2,
    },
    title: {
      fontSize: getFontSize(3),
      fontWeight: fontWeights.medium,
      lineHeight: 1.2,
    },
    subTitle: {
      fontWeight: fontWeights.normal,
      fontSize: getFontSize(2),
      color: 'black.90',
      lineHeight: 1.2,
    },
    detail: {
      fontWeight: fontWeights.normal,
      fontSize: getFontSize(1 / 2),
      color: 'black.70',
      lineHeight: 1.2,
    },
    content: {
      fontSize: getFontSize(1),
      lineHeight: 1.2,
    },
    tag: {
      fontSize: getFontSize(1 / 2),
      fontWeight: fontWeights.extraBold,
      backgroundColor: 'secondary.100',
      paddingLeft: 1 / 5,
      paddingRight: 1 / 5,
      borderRadius: getSpace(1 / 5),
      boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.4)'
    }
  },
};

export default TextTheme;
