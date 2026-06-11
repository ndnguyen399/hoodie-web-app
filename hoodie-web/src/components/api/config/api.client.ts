/**
 * @author duynguyen © 2025
 */
import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios.instance';

/**
 * ApiClient
 */
export const ApiClient = {
  get<T>(url: string, params?: any) {
    return axiosInstance.get<T>(url, { params })
      .then(res => res.data);
  },

  post<T>(url: string, body?: any) {
    return axiosInstance.post<T>(url, body)
      .then(res => res.data);
  },

  put<T>(url: string, body?: any) {
    return axiosInstance.put<T>(url, body)
      .then(res => res.data);
  },

  delete<T>(url: string) {
    return axiosInstance.delete<T>(url)
      .then(res => res.data);
  },

  postContainFile<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) {
    return axiosInstance.post<T>(
        url,
        body,
        config
    )
    .then(res => res.data);
  }
};
