/**
 * @author duynguyen © 2025
 */
import axios, {
  AxiosError
} from 'axios';
import type {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { AXIOS_CONFIG, API_BASE_URL } from './axios.config';
import { ApiError } from './api.error';
import { tokenStorage } from './token.storage';

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (
    callback: (token: string) => void
) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback =>
      callback(token)
  );
  refreshSubscribers = [];
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  ...AXIOS_CONFIG
});

/* ====================== REQUEST INTERCEPTOR ====================== */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // return config;
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/* ====================== RESPONSE INTERCEPTOR ====================== */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as RetryableRequest;
    const status = error.response?.status;
    /* ====================== 401 ====================== */
    // Unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clear();
        window.location.href = '/sign-in';
        return Promise.reject(
            ApiError.unauthorized(error)
        );
      }
      /* ===== refresh running ===== */
      if (isRefreshing) {
        return new Promise(resolve => {
            subscribeTokenRefresh(
                (newAccessToken: string) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(
                        axiosInstance(originalRequest)
                    );
                }
            );
        });
      }
      isRefreshing = true;
      try {
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/auth/refresh-token`,
            {
                refreshToken
            }
        );
        const newAccessToken = response.data.data.accessToken;
        tokenStorage.setAccessToken(
            newAccessToken
        );
        onRefreshed(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
          tokenStorage.clear();
          window.location.href = '/sign-in';
          return Promise.reject(refreshError);
      } finally {
          isRefreshing = false;
      }
    }

    if (status === 400) {
      return Promise.reject(
        ApiError.badRequest(error)
      );
    }

    if (status === 403 && !originalRequest._retry) {
      // return Promise.reject(
      //   ApiError.forbidden(error)
      // );
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clear();
        window.location.href = '/sign-in';
        return Promise.reject(
            ApiError.unauthorized(error)
        );
      }
      /* ===== refresh running ===== */
      if (isRefreshing) {
        return new Promise(resolve => {
            subscribeTokenRefresh(
                (newAccessToken: string) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(
                        axiosInstance(originalRequest)
                    );
                }
            );
        });
      }
      isRefreshing = true;
      try {
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/auth/refresh-token`,
            {
                refreshToken
            }
        );
        const newAccessToken = response.data.data.accessToken;
        tokenStorage.setAccessToken(
            newAccessToken
        );
        onRefreshed(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
          tokenStorage.clear();
          window.location.href = '/sign-in';
          return Promise.reject(refreshError);
      } finally {
          isRefreshing = false;
      }
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