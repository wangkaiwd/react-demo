import { AxiosInstance } from './types'
import { Axios } from './core/Axios'
import { extend } from './helpers/utils'

// 目的：使axios支持对象形式使用
// 实现方案： 创建一个class,class中有axios中多有要用到的属性，然后通过遍历将所有属性拷贝过来
const createInstance = (): AxiosInstance => {
  const context = new Axios()
  // instance及axios函数在调用的时候，this是window，所以如果有用到this的话，要进行更改this指向
  const instance = context.request
  return extend(instance, context)
}
const axios = createInstance()

export default axios
