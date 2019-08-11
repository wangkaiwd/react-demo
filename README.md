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
axios.get('/user?ID=12345')
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
