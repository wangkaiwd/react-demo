import axios from '../../src/index'

/**
 * 模拟404
 */
axios({
  url: '/error/get1',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

/**
 * 500
 */
axios({
  url: '/error/get',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

/**
 *  模拟请求过程中断网
 */
setTimeout(() => {
  axios({
    url: '/error/get',
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}, 6000)

/**
 * 超时
 */
axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
