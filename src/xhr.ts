import { AxiosRequestConfig, AxiosResponse } from './types'
// FIXME: 该处代码逻辑较长，需要优化
const xhr = (config: AxiosRequestConfig) => {
  return new Promise(resolve => {
    const { method = 'get', url, data = null, headers, responseType } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url)
    if (responseType) {
      // 要在调用open()初始化请求和send()发送请求到服务器之前调用
      request.responseType = responseType
    }
    Object.keys(headers).map(key => {
      // 如果没有传入data的话，会将Content-Type删除掉
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      }
      request.setRequestHeader(key, headers[key])
    })
    request.send(data)
    request.addEventListener('readystatechange', e => {
      // 这里也可以使用e.currentTarget来获取到当前的事件起源目标的引用(request)
      // e.target: 触发事件的元素
      // e.currentTarget: 附属于事件监听器的元素(绑定事件的元素)
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()

      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        config,
        request,
        headers: responseHeaders,
        data: request.response
      }
      resolve(response)
    })
  })
}
export default xhr
