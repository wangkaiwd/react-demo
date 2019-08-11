import { AxiosConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import transformRequest from './helpers/data'

const axios = (config: AxiosConfig) => {
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosConfig) => {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}
const transformUrl = (config: AxiosConfig) => {
  const { url, params } = config
  return buildUrl(url, params)
}
const transformRequestData = (config: AxiosConfig) => {
  return transformRequest(config.data)
}
export default axios
