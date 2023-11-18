export function errorIfUndefined<T>(err: Error, input?: T): asserts input is T {
  if (typeof input === undefined) {
    throw err;
  }
}
