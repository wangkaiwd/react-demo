import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/header'
import { createError } from '../helper/error'

// FIXME:
//  1. 该处代码逻辑较长，需要优化
//  2. 为什么这里的返回值的类型不能自动推断出来，必须明确指定？
const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const handleResponse = (response: AxiosResponse) => {
      // 为什么是这个范围内的状态码？
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
    const { method = 'get', url, data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!)
    if (responseType) {
      // 要在调用open()初始化请求和send()发送请求到服务器之前调用
      request.responseType = responseType
    }
    if (timeout) {
      // 要在调用open()初始化请求和send()发送请求到服务器之前调用
      request.timeout = timeout
    }
    Object.keys(headers).map(key => {
      // 如果没有传入data的话，会将Content-Type删除掉
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      }
      request.setRequestHeader(key, headers[key])
    })
    request.send(data)
    request.addEventListener('error', e => {
      reject(createError(`Network error`, config, null, request))
    })
    request.addEventListener('timeout', e => {
      reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    })
    request.addEventListener('readystatechange', e => {
      // 在请求完成前，status的值为0。如果XMLHttpRequest出错，浏览器返回的status也为0
      if (request.status === 0) {
        return
      }
      // 这里也可以使用e.currentTarget来获取到当前的事件起源目标的引用(request)
      // e.target: 触发事件的元素
      // e.currentTarget: 附属于事件监听器的元素(绑定事件的元素)
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        config,
        request,
        headers: responseHeaders,
        data: request.response
      }
      handleResponse(response)
    })
  })
}
export default xhr
