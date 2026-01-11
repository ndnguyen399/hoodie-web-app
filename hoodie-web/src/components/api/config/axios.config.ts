
export const AXIOS_CONFIG = {
  timeout: 30_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;