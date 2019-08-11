import { AxiosConfig } from './types'

const xhr = (config: AxiosConfig) => {
  // TypeScript不会进行类型转换，除非类型指定为any,否则无法在使用中改变定义好的类型
  const { method = 'get', url, data = null, headers } = config
  const request = new XMLHttpRequest()
  request.open(method, url)
  // 用于发送HTTP请求。
  // 接受一个可选参数作为请求主体；如果请求方法是GET或者HEAD，则应将请求主体设置为null
  request.send(data)
  Object.keys(headers!).forEach(header => {
    // 如果没有传入data,删除content-type请求头
    if (data === null && header.toLowerCase() === 'content-type') {
      delete headers![header]
    }
    // 设置请求头部的方法。此方法必须在open()方法和send()方法之间调用。
    // 如果多次对同一个请求头赋值,只会生成一个合并了多个值的请求头
    request.setRequestHeader(header, headers![header])
  })
  request.addEventListener('load', (e) => {
    console.log('success')
  })
}
export default xhr
