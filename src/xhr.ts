import { AxiosConfig } from './types'

const xhr = (config: AxiosConfig) => {
  const { method = 'get', url, data = null } = config
  const request = new XMLHttpRequest()
  request.open(method, url)
  // 用于发送HTTP请求。
  // 接受一个可选参数作为请求主体；如果请求方法是GET或者HEAD，则应将请求主体设置为null
  request.send(data)
  request.addEventListener('load', (e) => {
    console.log('success')
  })
}
export default xhr
