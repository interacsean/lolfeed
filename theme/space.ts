const scaleRatio = 1.3819;

const getSpace = (n: number) => {
  const numRems =
    n < 0
      ? -1
      : 1 *
      (n > 1
        ? Math.pow(scaleRatio, n - 1)
        : n < 1
          ? Math.pow(scaleRatio, -(1 / n - 1))
          : 1);
  return numRems;
};


const space = {
  [1/8]: `${getSpace(1/8)}rem`,
  [1/7]: `${getSpace(1/7)}rem`,
  [1/6]: `${getSpace(1/6)}rem`,
  [1/5]: `${getSpace(1/5)}rem`,
  [1/4]: `${getSpace(1/4)}rem`,
  [1/3]: `${getSpace(1/3)}rem`,
  [1/2]: `${getSpace(1/2)}rem`,
  1: `${getSpace(1)}rem`,
  2: `${getSpace(2)}rem`,
  3: `${getSpace(3)}rem`,
  4: `${getSpace(4)}rem`,
  5: `${getSpace(5)}rem`,
  6: `${getSpace(6)}rem`,
  7: `${getSpace(7)}rem`,
  8: `${getSpace(8)}rem`,
  'bodyH': `${getSpace(1)}rem`,
  'bodyTop': `${getSpace(1 / 2)}rem`,
}

export default space;