import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helper/url'

const axios = (config: AxiosRequestConfig) => {
  // 发请求之前，先要对配置项进行处理
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
