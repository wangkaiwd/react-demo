import dispatchRequest from '../../src'

dispatchRequest({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
