import { AnyObject } from '../types'
import { isPlainObject } from './utils'

// 在使用的时候请求头也支持传入小写： {'content-type':'application/json;utf-8'},要进行标准化处理
// 可以将小写转换为大写
const normalizeHeader = (headers: AnyObject, normalizedHeader: string): void => {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    if (key !== normalizedHeader && key.toUpperCase() === normalizedHeader.toUpperCase()) {
      headers[normalizedHeader] = headers[key]
      delete headers[key]
    }
  })
}

export const processHeaders = (headers: AnyObject, data: any): AnyObject => {
  normalizeHeader(headers, 'Content-Type')
  // 如果是原生普通对象，默认请求头为`application/json;charset=utf-8`
  // Content-Type: 实体头部用于指示资源的MIME类型
  if (isPlainObject(data) && headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}

// date: Tue, 13 Aug 2019 15:04:07 GMT
// etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
// connection: keep-alive
// x-powered-by: Express
// content-length: 13
// content-type: application/json; charset=utf-8
// 将这个格式的请求头转换为对象的形式
export const parseHeaders = (headers: string): AnyObject => {
  const result: AnyObject = {}
  // 通过trim()将前后的空格去除，否则会生成含有空字符串的数组
  headers.trim().split('\r\n').forEach(item => {
    const array = item.split(': ')
    result[array[0].toLowerCase()] = array[1]
  })
  return result
}
