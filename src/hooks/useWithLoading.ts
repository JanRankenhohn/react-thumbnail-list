import { useState, useCallback } from 'react';

const useWithLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = useCallback(async (fn, ...args) => {
    setIsLoading(true);
    try {
      await fn(...args);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, withLoading };
};

export default useWithLoading;
