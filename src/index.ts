import { AxiosConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

const axios = (config: AxiosConfig) => {
  processConfig(config)
  return xhr(config)
}

const processConfig = (config: AxiosConfig) => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
const transformUrl = (config: AxiosConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}
const transformHeaders = (config: AxiosConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
const transformRequestData = (config: AxiosConfig) => {
  return transformRequest(config.data)
}

export default axios
