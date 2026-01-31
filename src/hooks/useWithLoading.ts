import { useState, useCallback } from 'react';

/**
 * React hook that provides a loading state wrapper for async operations.
 * Automatically manages loading state before, during, and after async function execution.
 * 
 * @returns {Object} Hook return values
 * @returns {boolean} returns.isLoading - Current loading state
 * @returns {function} returns.withLoading - Function wrapper that manages loading state around async operations
 * 
 * @example
 * ```tsx
 * const { isLoading, withLoading } = useWithLoading();
 * 
 * const handleFetch = async () => {
 *   await withLoading(fetchData, userId);
 * };
 * ```
 */
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
