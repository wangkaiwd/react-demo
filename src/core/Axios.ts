import { AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

class Axios {
  // request (url: any, config?: any) 并不是重载列表里的一部分
  // 重载列表只有这俩个：
  // (config: AxiosRequestConfig): AxiosPromise
  // (url: string, config?: AxiosRequestConfig): AxiosPromise
  request(url: any, config?: any) {
    let tempConfig = config ?? {} // nullish coalescing operator
    if (config) {
      tempConfig.url = url
    } else {
      tempConfig = url
    }
    return dispatchRequest(tempConfig)
  }

  // 这里感觉有些过度封装，实际上并没有必要这样做
  private _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return dispatchRequest(Object.assign(config || {}, { url, method }))
  }

  // 可以通过一个数组遍历来实现对应方法的实现
  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return dispatchRequest(
      Object.assign(config || {}, {
        url,
        data,
        method
      })
    )
  }

  get(url: string, config?: AxiosRequestConfig) {
    config = config || {}
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('patch', url, data, config)
  }
}
export default Axios
