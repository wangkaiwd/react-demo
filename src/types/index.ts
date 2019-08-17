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

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: XMLHttpRequest
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosErrorProps extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
}

export interface AxiosProps {
  request (config: AxiosRequestConfig): AxiosPromise;

  get (url: string, config?: AxiosRequestConfig): AxiosPromise;

  delete (url: string, config?: AxiosRequestConfig): AxiosPromise;

  head (url: string, config?: AxiosRequestConfig): AxiosPromise;

  options (url: string, config?: AxiosRequestConfig): AxiosPromise;

  post (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  put (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  patch (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

// 描述一个函数：参数为config:AxiosRequestConfig,返回值是AxiosPromise，并且这个函数也是一个对象，它的属性继承自Axios
// 混合类型：https://www.tslang.cn/docs/handbook/interfaces.html
// axios就是一个混合类型的例子：自己本身是函数，但它也可以作为对象来使用
// 另外一个例子： React Dialog组件，可以直接调用，也可以通过方法来调用
export interface AxiosInstance extends AxiosProps {
  (config: AxiosRequestConfig): AxiosPromise;
}
