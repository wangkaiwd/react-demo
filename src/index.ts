import { AxiosRequestConfig } from './types'
import xhr from './xhr'

const axios = (axiosRequestConfig: AxiosRequestConfig) => {
  xhr(axiosRequestConfig)
}

export default axios
