import { AxiosRequestConfig } from './types'

const xhr = (config: AxiosRequestConfig) => {
  const { method = 'get', url, data = null, headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url)
  Object.keys(headers).map(key => request.setRequestHeader(key, headers[key]))
  request.send(data)
  request.addEventListener('load', e => {
    console.log('e', e)
  })
}
export default xhr
