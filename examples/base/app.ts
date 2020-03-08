import axios from '../../src'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
//
// const date = new Date()
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// 请求头
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

//
// // 请求的参数在浏览器中看不到？
// const arr = new Int32Array([21, 31])
//
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })
// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8',
//     'Accept': 'application/json,text/plain,*/*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// // 对于URLSearchParams对象，浏览器会自动设置请求头为：
// // application/x-www-form-urlencoded;charset=UTF-8
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// 请求头
// 请求时的responseType(必须在open和send之间进行设置)决定了响应的response类型，responseType默认为"text"
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))
