
import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
     // 这个地方放属性
    data: any
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
