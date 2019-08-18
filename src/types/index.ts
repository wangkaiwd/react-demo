export type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'delete' | 'DELETE'
  | 'options' | 'OPTIONS'
  | 'head' | 'HEAD'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AnyObject {
  [key: string]: any
}

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: AnyObject;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: XMLHttpRequest
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosErrorProps extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
}

export interface AxiosProps {
  request<T = any> (config: AxiosRequestConfig): AxiosPromise<T>;

  get<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  delete<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  head<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  options<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

// 描述一个函数：参数为config:AxiosRequestConfig,返回值是AxiosPromise，并且这个函数也是一个对象，它的属性继承自Axios
// 混合类型：https://www.tslang.cn/docs/handbook/interfaces.html
// axios就是一个混合类型的例子：自己本身是函数，但它也可以作为对象来使用
// 另外一个例子： React Dialog组件，可以直接调用，也可以通过方法来调用
export interface AxiosInstance extends AxiosProps {
  <T = any> (config: AxiosRequestConfig): AxiosPromise<T>;

  // 为什么要使用函数重载：可以更明确的表示相应的参数类型对应的返回值类型，让类型更加清晰(让代码类型更加明确)
  // 函数重载：为同一个函数提供多个函数类型定义，根据不同的参数返回不同类型的数据
  // TypeScript在执行函数的时候会查找重载列表,按照定义顺序进行匹配，如果匹配的话就使用这个
  // 注意：函数的实现中的类型定义并不是重载列表的一部分，这里指axios()函数
  <T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}
