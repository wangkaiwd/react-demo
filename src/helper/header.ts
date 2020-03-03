import { isPlainObject } from './utils'

// 将请求头进行序列化，让headers参数可以传入小写的'content-type`
const normalizedHeaders = (headers: any, normalizedKey: string) => {
  if (!headers) {
    return
  }
  Object.keys(headers).map(key => {
    // 用来判断用户传入的Content-Type是否为小写，如果是的话进行转换
    if (key !== normalizedKey && key.toUpperCase() === normalizedKey.toUpperCase()) {
      headers[normalizedKey] = headers[key]
      delete headers[key]
    }
  })
}
export const processHeaders = (headers: any, data: any) => {
  normalizedHeaders(headers, 'Content-Type')
  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}
