import axios from '../../src'
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

// post请求
axios({
  url: '/base/post',
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  url: '/base/post',
  method: 'post',
  headers: {
    'content-type': 'application/json',
    // 告知客户端可以处理的内容类型，这种类型用`MIME`类型来表示
    'Accept': 'application/json,text/plain,*/*'
  },
  data: {
    a: 1,
    b: 2
  }
})

// URLSearchParams: 接口定义了一些实用的方法来处理URL的查询字符串
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
// searchParams并不是原生普通对象，所以在逻辑中并没有进行处理
// 这里浏览器会自动处理searchParams对象，并设置相应的合适的请求头
axios({
  url: '/base/post',
  method: 'post',
  data: searchParams
})

// buffer数据
const arr = new Int32Array([21, 31])
axios({
  url: '/base/buffer',
  method: 'post',
  data: arr
})
