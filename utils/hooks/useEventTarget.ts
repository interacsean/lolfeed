import { useCallback } from 'react';

function useEventTarget<T extends string = string>(
  fn:
    | ((value: T, event: { target: { value: T } }) => Function)
    | ((value: T, event: { target: { value: T } }) => void),
) {
  return useCallback(
    (e: { target: { value: T } }) => {
      return fn(e.target.value, e);
    },
    [fn],
  );
}

export default useEventTarget;
