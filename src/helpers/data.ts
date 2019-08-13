import { isPlainObject } from './utils'

export const transformRequest = (data: any): any => {
  // 这里的data有还可能是Blob,FormData等对象,这些对象不需要进行处理
  // 普通对象需要转换成JSON格式的字符串
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformResponse = (data: any) => {
  if (typeof data === 'string') {
    // JSON是一种语法，用来序列化对象、数组、数值、字符串、布尔值和`null`
    try {
      data = JSON.parse(data)
    } catch (e) {
      //  do nothing
    }
  }
  return data
}
