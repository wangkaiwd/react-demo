import { AxiosRequestConfig } from '../types'

// 这里要为不同的字段设置不同的合并策略

// headers: 使用配置项进行深度合并，深拷贝并且对对象的每一个值进行合并
// params,url,data: 只使用用户传入项
// 其它配置项：用户传入的话使用用户传入项，否则使用默认配置

const defaultStrategy = (val1: any, val2: any) => {
  return typeof val2 !== 'undefined' ? val2 : val1
}

const fromVal2Strategy = (val1: any, val2: any) => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
interface IStrategies {
  [key: string]: any
}
const strategies: IStrategies = {}
const strategyKeysOfFromVal2 = ['url', 'params', 'data']

strategyKeysOfFromVal2.forEach(key => (strategies[key] = fromVal2Strategy))

const strategyKeysOfDeepMerge = ['headers']

const mergeConfig = (config1: AxiosRequestConfig, config2?: AxiosRequestConfig) => {
  if (!config2) {
    config2 = {}
  }
  const config: AxiosRequestConfig = {}
  const mergeField = (key: string) => {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }
  for (const key in config2) {
    if (config2.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  for (const key in config1) {
    if (config1.hasOwnProperty(key) && !config2[key]) {
      mergeField(key)
    }
  }
}

export default mergeConfig
