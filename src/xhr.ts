import { AxiosRequestConfig } from './types'

const xhr = (axiosRequestConfig: AxiosRequestConfig) => {
  const { method = 'get', url, data = null } = axiosRequestConfig
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url)
  request.send(data)
  request.addEventListener('load', e => {
    console.log('e', e)
  })
}
export default xhr
