import { AxiosRequestConfig } from './types'

const xhr = (config: AxiosRequestConfig) => {
  return new Promise(resolve => {
    const { method = 'get', url, data = null, headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url)
    Object.keys(headers).map(key => {
      // 如果没有传入data的话，会将Content-Type删除掉
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      }
      request.setRequestHeader(key, headers[key])
    })
    request.send(data)
    request.addEventListener('load', e => {
      console.log('e', e.target)
      resolve({})
    })
  })
}
export default xhr
