import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>,
  rejected: RejectedFn,
}
class InterceptorManage<T> {
  private readonly interceptors: Array<Interceptor<T> | null>

  constructor () {
    this.interceptors = []
  }

  use (resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject (interceptorId: number): void {
    if (this.interceptors[interceptorId]) {
      this.interceptors[interceptorId] = null
    }
  }

  // 遍历所有的拦截器，并为拦截器执行传入的回调函数
  forEach (fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
export default InterceptorManage
