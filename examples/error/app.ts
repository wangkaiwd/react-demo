import axios from '../../src'
import { AxiosErrorProps } from '../../src/types'

axios({
  url: '/error/get1'
}).then(res => {
  console.log('1', res)
}).catch(e => {
  console.log('err1', e)
})

axios({
  url: '/error/get'
}).then(res => {
  console.log('2', res)
}).catch((e: AxiosErrorProps) => {
  console.log('err2', e)
})

// 模拟断网的情况，当刚刷新页面的时候，在5秒钟内切换到断网状态就可以复现
setTimeout(() => {
  axios({
    url: '/error/get'
  }).then(res => {
    console.log('3', res)
  }).catch(e => {
    console.log('err3', e)
  })
}, 5000)

axios({
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('4', res)
}).catch(e => {
  console.log('err4', e)
})
