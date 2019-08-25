import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManage from './interceptorManage'

interface Interceptors {
  request: InterceptorManage<AxiosRequestConfig>;
  response: InterceptorManage<AxiosResponse>;
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise<T>);
  rejected?: RejectedFn;
}
export class Axios {
  interceptors: Interceptors

  constructor () {
    this.interceptors = {
      request: new InterceptorManage<AxiosRequestConfig>(),
      response: new InterceptorManage<AxiosResponse>()
    }
  }

  executeInterceptors (config: any) {
    const chain: PromiseChain<any>[] = [{ resolved: dispatchRequest, rejected: undefined }]
    // 后添加的先执行
    this.interceptors.request.forEach(interceptor => {
      // Array.prototype.unshift: 将一个或多个元素添加到数组的开头，并返回该数组的新长度（该方法修改原有数组）
      chain.unshift(interceptor)
    })
    // 先添加的后执行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    // Promise.resolve(value): 返回一个状态由给定value决定的Promise对象
    // 如果value是带有then方法的对象，返回Promise对象的最终状态由then方法执行决定
    // 否则，返回Promise对象的状态为fulfilled，并且将该value传递给对应的then方法
    let promise = Promise.resolve(config)
    while (chain.length) {
      // shift: 从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }

  request (url: any, config?: any): AxiosPromise {
    // 支持不同的参数调用，可以直接通过url来进行调用：
    // axios(config)
    // axios(url,config?)
    if (typeof url === 'string') {
      if (!config) {config = {}}
      config.url = url

    } else {
      config = url
    }
    return this.executeInterceptors(config)
  }

  get (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithoutData('get', url, config)
  }

  delete (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithoutData('delete', url, config)
  }

  head (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithoutData('head', url, config)
  }

  options (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithoutData('options', url, config)
  }

  post (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithData('post', url, data, config)
  }

  put (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithData('put', url, data, config)
  }

  patch (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._mergeConfigWithData('patch', url, data, config)
  }

  private _mergeConfigWithoutData (method: Method, url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    // Object.assign: 将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    // 语法： Object.assign(target,...sources)
    // target: 目标对象， sources: 源对象
    // 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象属性
    // return dispatchRequest(Object.assign(config, {
    //   method,
    //   url
    // }))
    return dispatchRequest({ method, url, ...config })
  }

  private _mergeConfigWithData (method: Method, url: string, data: any, config: AxiosRequestConfig = {}): AxiosPromise {
    return dispatchRequest({
      method,
      url,
      data,
      ...config
    })
  }
}
