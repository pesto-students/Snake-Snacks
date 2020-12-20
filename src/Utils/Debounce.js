import { useCallback, useState } from 'react';

export default function useDebounce({ wait }) {
  const [isTimeout, setIsTimeout] = useState(false);
  let timerId;

  useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      setIsTimeout(true);
    }, wait);
  }, [wait]);

  return isTimeout;
}
