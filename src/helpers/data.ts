import { isPlainObject } from './utils'

const transformRequest = (data: any): any => {
  // 这里的data有还可能是Blob,FormData等对象,这些对象不需要进行处理
  // 普通对象需要转换成JSON格式的字符串
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export default transformRequest
