import fontWeights from '../fontWeights';
import space, { getSpace } from '../space';

const getFontSize = (n: number) =>
  getSpace(n, true, 1.22);

const Text = {
  variants: {
    heading: {
      fontSize: getFontSize(2),
      fontWeight: fontWeights.bold,
      lineHeight: 1.3,
    },
    title: {
      fontSize: getFontSize(3),
      fontWeight: fontWeights.medium,
      lineHeight: 1.3,
    },
    subTitle: {
      fontWeight: fontWeights.normal,
      fontSize: getFontSize(2),
      color: 'black.90',
      lineHeight: 1.3,
    },
    detail: {
      fontWeight: fontWeights.normal,
      fontSize: getFontSize(1/2),
      color: 'black.70',
      lineHeight: 1.3,
    },
    content: {
      fontSize: getFontSize(1),
      lineHeight: 1.3,
    }
  },
};

export default Text;
