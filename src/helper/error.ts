import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  isAxiosError = true

  // parameter properties: let you create and initialize a member in one place
  constructor(
    message: string,
    public config: AxiosRequestConfig,
    public code?: string | null,
    public request?: XMLHttpRequest,
    public response?: AxiosResponse
  ) {
    // 将this指向父类
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
  }
}

export const createError = (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: XMLHttpRequest,
  response?: AxiosResponse
) => new AxiosError(message, config, code, request, response)
