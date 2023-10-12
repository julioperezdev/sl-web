export const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export const ONE_SECOUND: number = 1000;  