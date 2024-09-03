import timeSpan from "time-span";

/**
 * The return value of timeSpan() is a function that also has multiple methods, making it difficult to mock. Therefore,
 * we implemented a wrapper that returns only the functionality needed by this library.
 */
export function ownedTimeSpan(): () => number {
  const v = timeSpan();
  return v.seconds.bind(v);
}
