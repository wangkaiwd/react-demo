## ts-axios
使用`TypeScript`实现`axios`的客户端调用

### 思路
请求：
* 先简单按照`axios`的使用方式使用`XMLHttpRequest`发起一个基础的请求
* 根据`axios`官方提供的`demo`进行最简单的`get`请求发送
* 在发送`get`请求时，发现参数无法处理,所以需要将参数拼接到`url`后边
* 之后发送`post`请求，需要对请求的`data`进行处理：自动将请求发送的数据转换为`JSON`格式的字符串(要根据`xhr.send`方法所支持的参数类型来进行处理)
* 处理`data`的过程中，发现由于没有对应的请求头，所以服务端无法接受到数据，所以需要根据情况来处理请求头(传递`json`无法获取到参数)
* 如果传递的是字面量对象，则自动添加响应头`Content-Type:application/json`,并且支持用户输入小写内容

响应错误信息处理：
* 响应状态码不在 >=200 && < 300 之间，表明响应接收到了，可以获取到对应的响应信息
* 响应超时，不会有服务端响应
* 请求过程中出现错误： 如，请求发起后浏览器断网，不会有服务端响应

响应：
* 响应支持`Promise`(使用`Promise`来封装请求过程)
* 响应头为`http`报文格式，需要处理为`JavaScript`对象格式
* 返回的`response`类型默认为`text`(由`responseType`)来进行指定。当响应数据为`json`字符串时，我们想要自动转换

拦截器(请求拦截器/响应拦截器)：
* 调用`use`方法的时候，将对应的成功和失败回调放入数组中
* 在发请求之前，先将请求拦截器`push`到拦截器数组(存储`promise` `resolve`后执行的函数与`reject`后执行的函数)中，
之后将`xhr`请求函数`push`到数组中，之后将所有响应拦截器的内容`push`到数组中


### 技巧
* 通过传入一个对象，然后修改对象的引用，进而在其它地方直接使用更改后的对象
  ```typescript
  // 如axios的请求配置项config
  ```
* 通过请求的[`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)来指定响应`response`的类型，`responseType`默认为`text`
* 请求头的格式(都以换行符结尾，并且`key`和`value`之间以`: `进行分隔)：
  ```text
  connection: keep-alive
  content-length: 13
  content-type: application/json; charset=utf-8
  date: Sun, 08 Mar 2020 09:01:06 GMT
  etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
  x-powered-by: Express
  ```

### 知识点
[`TypeScript`函数重载](https://github.com/wangkaiwd/typescript-project/blob/5d6998f6521b547f32aea3b979e0b77f76b4c868/src/core/Axios.ts#L5-L17)：  
1. 先声明重载列表(函数所支持的参数和返回值类型：习惯上从最精确开始排列)
2. 函数真正定义和实现的时候，参数和返回值类型为`any`，并且这里的函数类型不算作重载列表
3. 根据实现时根据传入参数的类型以及是否传参进行判断，然后实现相应的逻辑 

直接使用`export`与`import`一起使用：
* [aggregate imports then export in Typescript](https://stackoverflow.com/questions/35837029/aggregate-imports-then-export-in-typescript)

`http`请求状态码分类：

`Promise`的`then`中的错误回调无法确定参数类型为`any`，需要手动指定

`JavaScript`如何生成唯一`id`确定数组的每一项:
* [`lodash`的`uniqueId`](https://github.com/lodash/lodash/blob/master/uniqueId.js)
* [ant design 动态增减表单项](https://3x.ant.design/components/form-cn/#components-form-demo-dynamic-form-item)
* 删除的时候不要将数组的某项直接删除，而是将该项置为`null`，判断如果对应索引的数据为`null`，则代码该项被删除

拦截器：
* [request interceptors order is reversed](https://github.com/axios/axios/issues/1663)
* 之后添加的请求拦截器会无法访问到之前拦截器所添加的内容，具体例子见上一条`issue`
* [preserve order of request interceptors.Fixes](https://github.com/axios/axios/pull/1041/files)

### 比较复杂的处理过程
* 元素深合并：`deepMerge`
* 请求`url`拼接
* 请求响应拦截器处理
