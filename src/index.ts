import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helper/url'
import { transformRequest } from './helper/data'

const axios = (config: AxiosRequestConfig) => {
  // 发请求之前，先要对配置项进行处理
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformUrl(config)
  config.data = transformData(config)
}

const transformUrl = (config: AxiosRequestConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}

const transformData = (config: AxiosRequestConfig) => {
  const { data } = config
  return transformRequest(data)
}

export default axios
