// 对象(内置对象和对象字面量)、数组、特殊符号、null/undefined
import { isDate, isEmpty } from './utils'

const encode = (value: string) => {
  // 对内容进行编码，并对编码后的内容进行替换
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function getSerializedParams(strings: string[], url: string) {
  const serializedParams = strings.join('&')
  if (serializedParams) {
    const index = url.indexOf('#')
    if (index !== -1) {
      url = url.slice(index)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

export const buildUrl = (url: string, params: any) => {
  if (!params) {
    return url
  }
  let strings: string[] = []
  Object.keys(params).map(key => {
    let values: any[]
    if (Array.isArray(params[key])) {
      values = params[key]
      key = `${key}[]`
    } else {
      values = [params[key]]
    }
    values.map((item: any) => {
      if (isEmpty(item)) {
        return
      }
      if (isDate(item)) {
        strings.push(`${key}=${item.toISOString()}`)
      } else {
        strings.push(`${key}=${encode(JSON.stringify(item))}`)
      }
    })
  })
  url = getSerializedParams(strings, url)
  return url
}
