import { AxiosRequestConfig } from './types'

const xhr = (config: AxiosRequestConfig) => {
  const { method = 'get', url, data = null } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url)
  request.send(data)
  request.addEventListener('load', e => {
    console.log('e', e)
  })
}
export default xhr
