import { RejectFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn
}
class InterceptorManager<T> {
  interceptors: (Interceptor<T> | null)[] = []

  use(resolved: ResolvedFn<T>, rejected?: RejectFn) {
    this.interceptors.push({ resolved, rejected })
    // 当前use的数组项所对应的索引:拦截器最后一项的索引
    return this.interceptors.length - 1
  }

  // 这里删除拦截器的时候要通过索引，所以不能直接删除，否则会导致数组的长度和索引发生变化
  // 导致拦截器id混乱
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 传入一个回调函数，并将interceptors中的每一项都作为回调函数的参数来执行回调函数
  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }
}
export default InterceptorManager
