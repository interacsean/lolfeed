import { useCallback } from 'react';

const useEventTarget = <T extends string = string>(
  fn: (value: T, event: { target: { value: T } }) => Function | void,
) => {
  return useCallback(
    (e: { target: { value: T } }) => {
      return fn(e.target.value, e);
    },
    [fn],
  );
};

export default useEventTarget;
