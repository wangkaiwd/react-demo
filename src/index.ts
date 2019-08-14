import { AnyObject, AxiosConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

const axios = (config: AxiosConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(
    (res) => transformResponseData(res)
  )
}

const processConfig = (config: AxiosConfig): void => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
const transformUrl = (config: AxiosConfig): string => {
  const { url, params } = config
  return buildUrl(url, params)
}
const transformHeaders = (config: AxiosConfig): AnyObject => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
const transformRequestData = (config: AxiosConfig): any => {
  return transformRequest(config.data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}
export default axios
