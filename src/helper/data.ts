import { isPlainObject } from './utils'

// FIXME: 试一下数组是如何处理的
export const transformRequest = (data: any) => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 由于不设置responseType的时候，会默认返回字符串类型的响应
// 而我们想对json字符串在响应的时候进行自动转换
export const transformResponse = (data: any) => {
  if (typeof data !== 'string') return data
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
