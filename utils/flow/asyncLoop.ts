async function asyncMap<T, R>(asyncMapFn: (item: T) => Promise<R>, items: T[]) {
  try {
    let mappedData: R[] = [];
    for (let i in items) {
      mappedData[i] = await asyncMapFn(items[i]);
    }
    return mappedData;
  } catch (e) {
    throw e;
  }
}

export default asyncMap;
