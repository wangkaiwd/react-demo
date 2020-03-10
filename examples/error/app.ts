import axios, { AxiosError } from '../../src/index'

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
}).catch((err: AxiosError) => {
  // 这里推断不出来err的类型: Promise中的错误处理函数的类型接受的参数为any
  //  onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null)
  // 这里我们手动指定err的类型
  console.log(err.name)
  console.log(err.code)
  console.log(err.config)
  console.log(err.message)
  console.log(err.isAxiosError)
  console.log(err.request)
  console.log(err.response)
})
