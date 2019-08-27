import { AxiosRequestConfig } from '../types'
import { deepMerge } from '../helpers/utils'

// 要将默认的配置项和传入的配置项进行合并
// 合并规则：
//    1. url,data,params 基本上每个请求都有，直接使用请求时传入的即可
//    2. headers会根据请求方式以及common(适用于所有请求)字段来为相应的请求设置请求头
//    3. 剩余配置以请求传入的为主：请求中传入用请求中的配置，否则用默认配置

const mergeConfig = (config1: AxiosRequestConfig, config2?: AxiosRequestConfig): any => {
  if (!config2) {
    config2 = {}
  }
  const config: AxiosRequestConfig = {}
  const keyFromConfig2 = ['url', 'data', 'params']
  const keyDeepMerge = ['headers']

  const handleKeyFrom2 = (key: any): void => {
    if (keyFromConfig2.includes(key)) {
      config[key] = config2![key]
    }
  }
  const handleMergeKey = (key: any): void => {
    if (!keyFromConfig2.includes(key) && !keyDeepMerge.includes(key)) {
      Object.keys(config1).forEach(key => {
        if (config2![key]) {
          return config[key] = config2![key]
        }
        return config[key] = config1[key]
      })
      Object.keys(config2!).forEach(key => config[key] = config2![key])
    }
  }
  const handleDeepMergeKey = (key: any): void => {
    if (keyDeepMerge.includes(key)) {
      config[key] = deepMerge(config1.headers, config2!.headers)
    }
  }
  Object.keys(config2).forEach(key => {
    handleKeyFrom2(key)
    handleMergeKey(key)
    handleDeepMergeKey(key)
  })
  return config
}
export default mergeConfig
