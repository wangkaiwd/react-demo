import { isPlainObject } from './utils'

export const transformRequest = (data: any) => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
