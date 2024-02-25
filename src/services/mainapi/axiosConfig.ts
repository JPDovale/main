import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios'
import { Response } from './responses/response'

const ENVIRONMENT = process.env.NODE_ENV ?? 'production'

const apiConfig: AxiosInstance = axios.create({
  baseURL: ENVIRONMENT === 'production' ? '/api' : 'http://localhost:3000/api',
  withCredentials: true,
})

apiConfig.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.resolve(error.response.data)
    }

    const err = {
      message: 'Não foi possível se conectar com o servidor!',
    }
    return Promise.resolve(err)
  },
)

const connection = {
  setDefaultBearerToken: (token: string) => {
    apiConfig.defaults.headers.Authorization = `Bearer ${token}`
  },

  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiConfig.get<unknown, Response<T, AxiosHeaders>>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiConfig.post<unknown, Response<T, AxiosHeaders>>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiConfig.put<unknown, Response<T, AxiosHeaders>>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiConfig.patch<unknown, Response<T, AxiosHeaders>>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiConfig.delete<unknown, Response<T, AxiosHeaders>>(url, config),
}

export { apiConfig, connection }
