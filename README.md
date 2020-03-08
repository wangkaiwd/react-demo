## ts-axios
使用`TypeScript`实现`axios`的客户端调用

### 思路
* 根据`axios`官方提供的`demo`进行最简单的`get`请求发送
* 在发送`get`请求时，发现参数无法处理,所以需要将参数拼接的`url`后边
* 之后发送`get`请求，需要对请求的`data`进行处理
* 处理`data`的过程中，发现由于没有对应的请求头，所以服务端无法接受到数据，所以需要根据情况来处理请求头

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
