/**
 * Logs a message to the console only in development mode.
 * In production, this function does nothing, preventing debug logs from appearing in production builds.
 * 
 * @param {unknown} message - The message or value to log
 * 
 * @example
 * ```tsx
 * logDev('Component rendered');
 * logDev({ items: filteredItems });
 * ```
 */
export const logDev = (message: unknown) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
};

/**
 * Logs a message to the console in all environments.
 * 
 * @param {unknown} message - The message or value to log
 * 
 * @example
 * ```tsx
 * log('Critical error occurred');
 * ```
 */
export const log = (message: unknown) => {
  console.log(message);
};
