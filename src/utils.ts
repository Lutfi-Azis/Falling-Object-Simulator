/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Debounce a function.
 * @param func Function to be debounced
 * @param timeout Timeout (ms)
 * @returns Debounced function
 */
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: number;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
