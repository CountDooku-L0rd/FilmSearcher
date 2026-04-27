export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  ms: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutTimer: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
    timeoutTimer = setTimeout(() => func.apply(this, args), ms);
  };
};