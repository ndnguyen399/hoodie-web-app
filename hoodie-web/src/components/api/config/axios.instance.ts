import axios, {
  AxiosError
} from 'axios';
import type {AxiosInstance, AxiosResponse} from 'axios';
import { AXIOS_CONFIG, API_BASE_URL } from './axios.config';
import { ApiError } from './api.error';

// let isRefreshing = false;
// let refreshQueue: Array<(token: string) => void> = [];

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  ...AXIOS_CONFIG
});

/* ====================== REQUEST INTERCEPTOR ====================== */
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

/* ====================== RESPONSE INTERCEPTOR ====================== */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    const status = error.response?.status;

    // Unauthorized
    if (status === 401) {
      // Có thể mở rộng refresh token tại đây
      return Promise.reject(
        ApiError.unauthorized(error)
      );
    }

    if (status === 403) {
      return Promise.reject(
        ApiError.forbidden(error)
      );
    }

    if (status === 400) {
      return Promise.reject(
        ApiError.badRequest(error)
      );
    }

    if (status && status >= 500) {
      return Promise.reject(
        ApiError.serverError(error)
      );
    }

    return Promise.reject(
      ApiError.unknown(error)
    );
  }
);