export const isEmpty = <T>(arr: Array<T>) => {
  return Array.isArray(arr) && arr.length === 0
}
