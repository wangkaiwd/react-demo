## `ts-axios`
学习`TypeScript`的实战应用

## 需求分析
`axios`的几种使用方式：  
* 直接调用`axios(options)`方法
* 通过`axios.httpVerb(options)`来发起请求

这里的`httpVerb`包括： 
* `axios.get`
* `axios.delete`
* `axios.head`
* `axios.options`
* `axios.post`
* `axios.put`
* `axios.patch`

### 处理`get`请求的参数`params`
在发起`get`请求时,参数是在`url`后通过`?`来连接，一个常见的`get`请求`url`如下：  
```text
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2
```

而在`axios`中，发起`get`请求会要求我们传递一个对象：  
```javascript
dispatchRequest.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```

所以我们的大概思路如下：  

将调用函数传递对象的`key`和`value`用`=`连接，键值对之间又通过`&`来进行连接，之后和请求路径进行拼接。

下面我们分析一下不同数据类型对应请求参数处理。
#### 参数值为数组
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```
请求`url`:  
```text
/base/get?foo[]=bar&foo[]=baz
```
#### 参数值为对象
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```
请求`url`:  
```text
/base/get?foo=%7B%22bar%22:%22baz%22%7D
```
`foo`后面拼接的是`{"bar":"baz"}`通过`encodeURIComponent（JSON.stringify({"bar":"baz"})`后的结果，但是这里`:`会被提换回转义之前。

#### 参数值为`Date`
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})
```
请求`url`:  
```text
/base/get?date=2019-08-11T10:31:27.085Z
```
`date`后拼接的是`date.toIOSString()`后的结果

#### 特殊字符支持
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```
最终请求`url`: 
```text
/base/get?foo=@:$,+
```
我们允许`@`,`:`,`$`,`,`,` `,`[`,`]`字符在`url`显示，不被`encode`:  
```typescript
const encode = (value: string): string => {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}
```
#### 空值忽略
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null,
    others: undefined
  }
})
```
请求`url`:  
```text
/base/get?foo=bar
```
不会将`null`和`undefined`的值添加到`url`参数中

#### 舍弃哈希值
```javascript
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})
```
请求`url`:  
```text
/base/get?foo=bar
```

当请求地址中存在`hash`值的时候会将其舍弃

#### 保留`url`中已存在的参数
```javascript
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    baz: 'baz'
  }
})
```
请求`url`:  
```text
/base/get?foo=bar&baz=baz
```

如果请求地址中原本就有参数存在的话要将其保留。

## 拦截器
`axios`的拦截器的用法如下：  
```javascript
axios.interceptors.request.use(
  config => {
    // 在请求发起之前做一些事情
    return config
  },
  error => {
    // 请求失败的时候做一些事情
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // 对响应数据做一些操作
    return response
  },
  error => {
    // 响应出错
    return Promise.reject(error)
  }
)
```
在执行`use`方法的时候，会向`interceptorManage`的`interceptors`数组中`push` `use`方法中传入的成功和失败处理函数，并将当前`use`方法的参数在`interceptors`作为当前执行的`id`进行返回，用来在之后取消拦截器。


在执行`request`方法发起请求的时候，会分别将请求拦截器和响应拦截器组合成为一个`Promise`链

这里我们会先定义一个`PromiseChain`中的默认项： 
```javascript
const chain = [{
  resolved: dispatchRequest,
  reject: undefined
}]
```
之后将请求拦截器通过`unshift`放入到`chain`数组中，将响应拦截器通过`push`放入的`chain`数组中。

假设我们有3个请求以及3个响应拦截器，最后生成的`chain`数组大概如下：  
```javascript
const chain = [
  {resolved: 'req3',rejected: 'reqErr3'},
  {resolved: 'req2',rejected: 'reqErr2'},
  {resolved: 'req1',rejected: 'reqErr1'},
  {resolved: dispatchRequest,rejected: undefined},
  {resolved: 'res1',rejected: 'resErr1'},
  {resolved: 'res2',rejected: 'resErr2'},
  {resolved: 'res3',rejected: 'resErr3'},
]
```  
> 这里的`req`和`res`分别代表请求和响应拦截器中传入的函数

最终我们会递归调用`PromiseChain`:  
```javascript
let promise = Promise.resolve(config)
while(chain.length) {
  const {resolved,rejected} = chain.shift
  promise = promise.then(resolved,rejected)
}
```
这里会先根据请求拦截器逆序来调用，请求拦截器全部调用完毕后，会将请求拦截器中最后返回的`config`作为`dispatchRequest`的参数来发起请求。

在请求发起后会将对应的响应返回，此时会根据响应拦截器的正序来继续调用响应拦截器，参数为上次一`Promise`中`then`方法返回的内容。
