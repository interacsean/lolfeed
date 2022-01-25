const scaleRatio = 1.3819;

export const getSpace = (n: number, inclRem: boolean = true, ratio: number = scaleRatio) => {
  const numRems =
    n < 0
      ? -1
      : 1 *
      (n > 1
        ? Math.pow(ratio, n - 1)
        : n < 1
          ? Math.pow(ratio, -(1 / n - 1))
          : 1);
  return inclRem ? `${numRems}rem` : numRems;
};

const space = {
  [1/8]: getSpace(1/8),
  [1/7]: getSpace(1/7),
  [1/6]: getSpace(1/6),
  [1/5]: getSpace(1/5),
  [1/4]: getSpace(1/4),
  [1/3]: getSpace(1/3),
  [1/2]: getSpace(1/2),
  1: getSpace(1),
  2: getSpace(2),
  3: getSpace(3),
  4: getSpace(4),
  5: getSpace(5),
  6: getSpace(6),
  7: getSpace(7),
  8: getSpace(8),
  'bodyHPadBase': getSpace(1),
  'bodyTop': getSpace(1 / 2),
  'bodyBottom': getSpace(2),
}

export default space;