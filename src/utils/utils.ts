export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  ms: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutTimer: ReturnType <typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
    timeoutTimer = setTimeout(() => func.apply(this, args), ms);
  };
};
