import { isDate, isObject } from './utils'

// https://www.the-art-of-web.com/javascript/escape/
// 处理特殊符号: '@', ':' ,'$', ',','+','[',']'
const encode = (value: string): string => {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%2C/ig, ',')
    .replace(/20%/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}
// http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
// {key1:value1,key2:value2}

const joinParamsForUrl = (url: string, keyValuePairs: string[]): string => {
  const serializeParams = keyValuePairs.join('&')
  let resultUrl = url
  if (serializeParams) {
    //  去掉hash值
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      resultUrl = url.slice(0, hashIndex)
    }
    // 如果之前就有?即query string参数，则继续在后面拼接参数，否则直接通过?拼接参数
    if (url.indexOf('?') === -1) {
      resultUrl = `${url}?${serializeParams}`
    } else {
      resultUrl = `${url}${serializeParams}`
    }
  }
  return resultUrl
}
export const buildUrl = (url: string, params?: any): string => {
  if (!params) return url
  const keyValuePairs: string[] = []
  const addKeyValuesPair = (key: string, value: any): void => {
    keyValuePairs.push(`${encode(key)}=${encode(value)}`)
  }
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key]
      if (value === null || typeof value === 'undefined') break
      if (Array.isArray(value)) {
        addKeyValuesPair(`${key}[]`, JSON.stringify(value))
      } else if (isDate(value)) {
        addKeyValuesPair(key, value.toISOStirng())
      } else if (isObject(value)) {
        addKeyValuesPair(key, JSON.stringify(value))
      }
    }
  }
  return joinParamsForUrl(url, keyValuePairs)
}
