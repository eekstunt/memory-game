export function deepCopyArray<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}
