// 对象(内置对象和对象字面量)、数组、特殊符号、null/undefined
import { isDate, isEmpty } from './utils'
import validate = WebAssembly.validate

export const buildUrl = (url: string, params: any) => {
  if (!params) {
    return url
  }
  let strings: string[] = []
  Object.keys(params).map(key => {
    // const value = Array.isArray(params[key]) ? params[key] : [params[key]]
    let value: any[]
    if (Array.isArray(params[key])) {
      value = params[key]
      key = `${key}[]`
    } else {
      value = [params[key]]
    }
    // 只对第一层元素进行类型判断，所以不需要递归处理
    // {foo:[1,2,3]} => path/something?foo[]=1&foo[]=2&foo[]=3
    // {foo:{a:1,b:2,c:3}} => path/something?foo[]=encoded(JSON.stringify({a:1,b:2,c:3}))
    // {foo:[{a:1},{b:2}]} => path/something?foo[]=encoded(JSON.stringify({a:1}))&foo[]=encoded(JSON.stringify({b:2}))
    value.map((item: any) => {
      if (isEmpty(item)) {
        return
      }
      if (isDate(item)) {
        strings.push(`${key}=${item.toISOString()}`)
      } else {
        strings.push(`${key}=${encodeURI(JSON.stringify(item))}`)
      }
    })
  })
  return `${url}?${strings.join('&')}`
}
