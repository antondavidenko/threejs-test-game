let currentTimeoutId: number;

export function promiseDelay(delay:number): Promise<void> {
  // clearTimeout(currentTimeoutId);
  return new Promise((resolve) => {
    currentTimeoutId = setTimeout(resolve, delay);
  });
}
