import { AxiosConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'

const axios = (config: AxiosConfig) => {
  transformUrl(config)
  xhr(config)
}

const transformUrl = (config: AxiosConfig) => {
  const { url, params } = config
  config.url = buildUrl(url, params)
}
export default axios
