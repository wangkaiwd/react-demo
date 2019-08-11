import axios from '../../src'
// 测试数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 测试对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 测试日期
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})

// 测试特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 测试null和undefined
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null,
    others: undefined
  }
})

// 测试url带有hash
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// 测试url已经带有部分参数值
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    baz: 'baz'
  }
})
