import { AxiosConfig } from './types'
import xhr from './xhr'

const axios = (config: AxiosConfig) => {
  xhr(config)
}
export default axios
