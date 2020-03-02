// 对象(内置对象和对象字面量)、数组、特殊符号、null/undefined
import { isDate, isEmpty, isPlainObject } from './utils'

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

// 将参数以问号的形式拼接到url后面
// 对对象中的每一项的值进行类型判断，然后分别进行处理
// 1. 数组: key需要拼接[]字符串，value需要经过2,3,4,5步骤进行处理
// 2. 字面量对象: 需要转换为JSON.string(),然后再执行encodeURIComponent进行编码，如果对象中含有特殊符号，则需要替换回来
// 3. 日期对象：需要转换为toISOString
// 4. 空值：null/undefined 不会出现在参数中
// 5. others：以k1=v1&k2=v2的格式进行拼接
// 6. url中含有?：直接通过&进行拼接
// 7. url含有hash: 舍弃#后面的内容
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
      } else if (isPlainObject(item)) {
        strings.push(`${key}=${encode(JSON.stringify(item))}`)
      } else {
        strings.push(`${key}=${item}`)
      }
    })
  })
  console.log('strings', strings)
  url = getSerializedParams(strings, url)
  return url
}
