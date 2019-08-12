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

export interface AxiosConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: AnyObject;
  responseType?: XMLHttpRequestResponseType;
}


