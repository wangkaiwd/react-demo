import dispatchRequest from '../../src'
// // 测试数组
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
//
// // 测试对象
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
// // 测试日期
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date: new Date()
//   }
// })
//
// // 测试特殊字符
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
//
// // 测试null和undefined
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null,
//     others: undefined
//   }
// })
//
// // 测试url带有hash
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
//
// // 测试url已经带有部分参数值
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     baz: 'baz'
//   }
// })

// // post请求
// axios({
//   url: '/base/post',
//   method: 'post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// axios({
//   url: '/base/post',
//   method: 'post',
//   headers: {
//     'content-type': 'application/json',
//     // 告知客户端可以处理的内容类型，这种类型用`MIME`类型来表示
//     'Accept': 'application/json,text/plain,*/*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// // URLSearchParams: 接口定义了一些实用的方法来处理URL的查询字符串
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// // searchParams并不是原生普通对象，所以在逻辑中并没有进行处理
// // 这里浏览器会自动处理searchParams对象，并设置相应的合适的请求头
// axios({
//   url: '/base/post',
//   method: 'post',
//   data: searchParams
// })
//
// // buffer数据
// const arr = new Int32Array([21, 31])
// axios({
//   url: '/base/buffer',
//   method: 'post',
//   data: arr
// })

// 如果传入普通对象，在发起请求的时候会自动进行JSON.stringify
// 在接收到响应的时候，如果是字符串的话会自动尝试通过JSON.parse解析，如果不能解析的话就原样返回
dispatchRequest({
  url: '/base/post',
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log('res', res)
})

// 当指定responseType: 'json',浏览器会自动将返回数据通过JSON.parse解析
dispatchRequest({
  url: '/base/post',
  method: 'post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log('res', res)
})
