export const isDate = (value: Date): boolean => {
  return toString.call(value) === '[object Date]'
}

export const isObject = (value: any): boolean => {
  // return value !== null && typeof value === 'object'
  return toString.call(value) === '[object Object]'
}
