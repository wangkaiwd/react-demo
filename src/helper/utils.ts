export const isEmpty = (value: any) => {
  return typeof value === 'undefined' || value === null
}
const toString = Object.prototype.toString
export const isPlainObject = (value: any): value is Object => {
  return toString.call(value) === '[object Object]'
}

// 类型谓词
export const isDate = (value: any): value is Date => {
  return value !== null && typeof value === 'object'
}
