## ts-axios
使用`TypeScript`实现`axios`的客户端调用

### 思路
请求：
* 先简单按照`axios`的使用方式使用`XMLHttpRequest`发起一个基础的请求
* 根据`axios`官方提供的`demo`进行最简单的`get`请求发送
* 在发送`get`请求时，发现参数无法处理,所以需要将参数拼接到`url`后边
* 之后发送`post`请求，需要对请求的`data`进行处理
* 处理`data`的过程中，发现由于没有对应的请求头，所以服务端无法接受到数据，所以需要根据情况来处理请求头(传递`json`无法获取到参数)
* 如果传递的是字面量对象，则自动添加响应头`Content-Type:application/json`,并且支持用户输入小写内容

响应：
* 响应支持`Promise`(使用`Promise`来封装请求过程)
* 响应头为`http`报文格式，需要处理为`JavaScript`对象格式
* 返回的`response`类型默认为`text`(由`responseType`)来进行指定。当响应数据为`json`字符串时，我们想要自动转换

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

