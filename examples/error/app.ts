import axios from '../../src'

axios({
  url: '/error/get1'
}).then(res => {
  console.log('1', res)
}).catch(e => {
  console.log('1', e)
})

axios({
  url: '/error/get'
}).then(res => {
  console.log('2', res)
}).catch(e => {
  console.log('2', e)
})

setTimeout(() => {
  axios({
    url: '/error/get'
  }).then(res => {
    console.log('3', res)
  }).catch(e => {
    console.log('3', e)
  })
}, 5000)

axios({
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('4', res)
}).catch(e => {
  console.log('4', e)
})
