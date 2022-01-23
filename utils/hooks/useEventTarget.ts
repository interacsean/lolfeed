import { useCallback } from 'react';

const useEventTarget = (
  fn: (value: string, event: { target: { value: string } }) => Function | void,
) => {
  return useCallback(
    (e: { target: { value } }) => {
      return fn(e.target.value, e);
    },
    [fn],
  );
};

export default useEventTarget;
