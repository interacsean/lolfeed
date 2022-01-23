import { SyntheticEvent, useCallback } from 'react';

const usePreventDefault = <T extends any[], R>(
  fn: (e: SyntheticEvent<any>) => R,
) => {
  return useCallback(
    (e: SyntheticEvent<any>) => {
      e.preventDefault();
      return fn(e);
    },
    [fn],
  );
};

export default usePreventDefault;
