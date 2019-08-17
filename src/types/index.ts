type Method = 'get' | 'GET'
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
  url: string;
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
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: XMLHttpRequest,
  response?: AxiosResponse,
}
