import axios from '../../src'

// axios({
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   },
//   method: 'get'
// })
//
// axios.request({
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   },
//   method: 'get'
// })
//
// axios.get('/extend/get', {
//   params: {
//     a: 1,
//     b: 2
//   }
// })
//
// axios.post('/extend/post')
// axios.options('/extend/options')
// axios.delete('/extend/delete')
// // head请求没有响应体
// axios.head('/extend/head', { params: { a: 1, b: 2 } })
// axios.put('/extend/put')
// // XMLHttpRequest.open(method,url,async) 这里的method要大写，否则会报400错误
// // 400: Bad Request
// //  1. 语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求
// //  2. 请求参数有误
// axios.patch('/extend/patch', { msg: 'patch' })
//
// axios({
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   },
//   method: 'get'
// })
// axios('/extend/get', {
//   params: {
//     a: 1,
//     b: 2
//   },
//   method: 'get'
// })

// 通过泛型参数来约定返回值的类型,这样之后我们就可以提前定义接口返回的对象属性值和类型
interface ResponseData<T = any> {
  code: number;
  result: T;
  message: string;
}

// 接口返回数据中result的类型
interface User {
  name: string;
  age: number;
}

const getUser = <T> () => {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.log(err))
}

const test = async () => {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}
test()
