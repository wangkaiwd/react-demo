import { AxiosConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'

const xhr = (config: AxiosConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    // TypeScript不会进行类型转换，除非类型指定为any,否则无法在使用中改变定义好的类型
    const { method = 'get', url, data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method, url)
    Object.keys(headers!).forEach(header => {
      // 如果没有传入data,删除content-type请求头
      if (data === null && header.toLowerCase() === 'content-type') {
        delete headers![header]
      }
      // 设置请求头部的方法。此方法必须在open()方法和send()方法之间调用。
      // 如果多次对同一个请求头赋值,只会生成一个合并了多个值的请求头
      request.setRequestHeader(header, headers![header])
    })
    // responseType: 可枚举的字符串，表示服务器返回数据的类型。
    // 该属性可写，要在`open()`方法后、`send()`方法前设置属性值，告诉服务器返回指定类型的数据
    // 可能的值：
    //    "": 等同于text,表示服务器返回文本数据
    //    "arraybuffer": ArrayBuffer对象，表示服务器返回二进制数组
    //    "blob": Blob对象，表示服务器返回二进制对象
    //    "document": Document对象，表示服务器返回一个文档对象
    //    "json": JSON对象，浏览器会自动调用JSON.parse()方法
    //    "text": 字符串
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    // 用于发送HTTP请求。
    // 接受一个可选参数作为请求主体；如果请求方法是GET或者HEAD，则应将请求主体设置为null
    request.send(data)

    // readystatechange会在XMLHttpRequest的readyState属性发生改变时触发
    // 当readyState的值为4的时候表示请求已经完成
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return
      // 在请求完成前status的值为0。如果XMLHttpRequest出错，浏览器返回的status也为0
      if (request.status === 0) return
      // request.getAllResponseHeaders: 返回所有响应头,分别将各个相应头用\r\n来进行分割
      // const headers = request.getAllResponseHeaders()
      const headers = parseHeaders(request.getAllResponseHeaders())
      const data = responseType === 'text' ? request.responseText : request.response
      const { status, statusText } = request
      handleResponse({ headers, data, status, statusText, config, request })
    })

    request.addEventListener('error', (err) => {
      console.log('err', err)
      reject(new Error('Network Error'))
    })

    request.addEventListener('timeout', (e) => {
      console.log('timeout', e)
      reject(new Error(`Timeout of ${timeout} exceeded`))
    })

    const handleResponse = (response: AxiosResponse): void => {
      const { status } = response
      if (status >= 200 && status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${status}`))
      }
    }
  })

}
export default xhr
