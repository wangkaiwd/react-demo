import Axios from './core/Axios'
import { extend } from './helper/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'
import defaults from './defaults'

const createInstance = (defaults: AxiosRequestConfig): AxiosInstance => {
  const context = new Axios(defaults)
  // axios可以直接传入配置项调用
  // const instance = Axios.prototype.request // 这里不通过bind来纠正this目前的代码也不会出现问题
  // 这里如果直接调用instance的话, this => undefined (类声明和类表达式的主体都执行在严格模式下)
  const instance = Axios.prototype.request.bind(context)
  // 这样写的话也需要通过`bind`来指定this指向
  // const instance = context.request
  return extend(instance, context)
}

const axios = createInstance(defaults)
export default axios
