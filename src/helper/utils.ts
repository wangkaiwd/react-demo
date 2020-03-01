export const isEmpty = (value: any) => {
  return typeof value === 'undefined' || value === null
}
const toString = Object.prototype.toString
export const isPlainObject = (value: any) => {
  return toString.call(value) === '[object Object]'
}

export const isDate = (value: any): value is Date => {
  return toString.call(value) === '[object Date]'
}

// 类型谓词
export const isObject = (value: any): value is Object => {
  return value !== null && typeof value === 'object'
}
