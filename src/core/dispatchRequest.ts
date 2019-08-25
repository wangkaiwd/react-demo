import { AnyObject, AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/header'

const dispatchRequest = (config: AxiosRequestConfig): AxiosPromise => {
  console.log('dispatchRequest', config)
  processConfig(config)
  return xhr(config).then(
    (res) => {
      console.log('response', res)
      return transformResponseData(res)
    }
  )
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildUrl(url!, params)
}
const transformHeaders = (config: AxiosRequestConfig): AnyObject => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}
export default dispatchRequest
