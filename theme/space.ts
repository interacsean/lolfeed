const scaleRatio = 1.3819;

export const getSpace = (
  n: number,
  inclRem: boolean = true,
  ratio: number = scaleRatio,
) => {
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
  bodyHPadBase: getSpace(1),
  bodyTopPad: getSpace(1 / 2),
  bodyBottomPad: getSpace(2),
};

export default space;
