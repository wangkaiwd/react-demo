import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    // 所有请求的请求头
    common: {
      // Accept请求头用来告知(服务器)客户端可以处理的内容类型，这种内容类型用MIME类型来表示
      Accept: 'application/json，text/plain，*/*'
    }
  }
}

const methodsNoData = ['get', 'delete', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']
methodsNoData.forEach(method => (defaults.headers[method] = {}))

// 为什么有data参数的请求方式的请求头要添加该设置？
methodsWithData.forEach(
  method => (defaults.headers[method] = { 'Content-Type': 'application/x-www-form-urlencoded' })
)

export default defaults
