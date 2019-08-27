// 用户自定义的类型保护
// 类型谓词：parameterName is Type
// 执行这个函数后就会明确告诉ts value is Date 类型
export const isDate = (value: Date): value is Date => {
  return toString.call(value) === '[object Date]'
}

export const isPlainObject = (value: any): value is object => {
  // return value !== null && typeof value === 'object'
  return toString.call(value) === '[object Object]'
}

// 这里用到了很多类型断言，感觉实现的不太好
export const extend = <T, U> (to: T, from: U): T & U => {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// headers: {
//   common: {
//     Accept: 'application/json,text/plain,*/*'
//   },
//   post: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }

export const deepMerge = (...objs: any[]): any => {
  const result: any = {}
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
