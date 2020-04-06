import {
  AxiosRequestConfig,
  AxiosResponse,
  Interceptors,
  Method,
  RejectFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'

interface PromiseChain<T = any> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn
}
class Axios {
  interceptors: Interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>()
  }

  // request (url: any, config?: any) 并不是重载列表里的一部分f
  // 重载列表只有这俩个：
  // (config: AxiosRequestConfig): AxiosPromise
  // (url: string, config?: AxiosRequestConfig): AxiosPromise
  request(url: any, config?: any) {
    if (config) {
      config.url = url
    } else {
      config = url
    }
    const chain: PromiseChain[] = []

    // 复习数组的添加和删除方法：
    // 都会改变原数组:
    //  1. Array.prototype.shift: 删除数组开头的第一个元素，并返回这个被删除的元素
    //  2. Array.prototype.unshift: 在数组的开头添加一个或多个元素，返回数组的新长度
    //  3. Array.prototype.pop: 删除数组的最后一个元素，并返回这个被删除的元素
    //  4. Array.prototype.push: 在数组的末尾添加一个或多个元素，并返回数组的新长度
    this.interceptors.request.forEach(interceptor => {
      chain.push(interceptor)
    })
    chain.push({ resolved: dispatchRequest, rejected: undefined })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    // while (chain.length) {
    //   // [].shift === undefined
    //   const { resolved, rejected } = chain.shift()!
    //   promise = promise.then(resolved, rejected)
    // }
    chain.map(({ resolved, rejected }) => {
      promise = promise.then(resolved, rejected)
    })
    return promise
  }

  // 这里感觉有些过度封装，实际上并没有必要这样做
  private _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method }))
  }

  // 可以通过一个数组遍历来实现对应方法的实现
  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request(
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
