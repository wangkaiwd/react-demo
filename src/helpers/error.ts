import { AxiosErrorProps, AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: AxiosResponse

  constructor(options: AxiosErrorProps) {
    super(options.message)
    this.isAxiosError = options.isAxiosError
    this.config = options.config
    this.code = options.code
    this.request = options.request
    this.response = options.response
    // https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    // custom class extends built-in object,array etc for can use methods and property get complete code hint
    Object.setPrototypeOf(this, Error.prototype)
  }
}

export const createError = (options: AxiosErrorProps) => {
  return new AxiosError(options)
}
