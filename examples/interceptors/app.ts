import axios, { AxiosRequestConfig } from '../../src'

axios.interceptors.request.use(config => {
  config.headers.test += 1
  return config
})
