import axios, { AxiosRequestConfig } from '../../src'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(response => {
  response.data += '1'
  return response
})

const interceptorId = axios.interceptors.response.use(response => {
  response.data += '2'
  return response
})

axios.interceptors.response.use(response => {
  response.data += '3'
  return response
})
axios.interceptors.response.eject(interceptorId)
axios('/interceptor/get', {
  headers: {
    test: ''
  }
}).then(res => {
  console.log('res', res)
})
