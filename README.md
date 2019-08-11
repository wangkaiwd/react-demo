## `ts-axios`
学习`TypeScript`的实战应用

### 需求分析
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

#### 处理`get`请求的参数`params`

##### 参数值为数组
##### 参数值为对象
##### 参数值为`Date`
##### 特殊字符支持
##### 空值忽略
##### 舍弃哈希值
##### 保留`url`中已存在的参数
