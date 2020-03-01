// 对象(内置对象和对象字面量)、数组、特殊符号、null/undefined
import { isDate, isEmpty } from './utils'

export const buildUrl = (url: string, params: any) => {
  if (!params) {
    return url
  }
  let strings: string[] = []
  Object.keys(params).map(key => {
    const value = params[key]
    if (isEmpty(value)) {
      return
    }
    // {foo:[1,2,3]} => path/something?foo[]=1&foo[]=2&foo[]=3
    // {foo:{a:1,b:2,c:3}} => path/something?foo[]=encoded(JSON.stringify({a:1,b:2,c:3}))
    // {foo:[{a:1},{b:2}]} => path/something?foo[]=encoded(JSON.stringify({a:1}))&foo[]=encoded(JSON.stringify({b:2}))
    if (Array.isArray(value)) {
      value.map(item => {
        if (isEmpty(item)) {
          return
        }
        strings.push(`${key}[]=${item}`)
      })
    }
    if (isDate(value)) {
      strings.push(value.toISOString())
    }
    strings.push(value)
  })
  return `${url}?${strings.join('&')}`
}
