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
axios.post('/extend/post')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.put('/extend/put')
axios.patch('/extend/patch1', { msg: 'patch' })
