// src/lib/http.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

const RAW_BASE =
  (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
  'http://localhost:4000/api';

const BASE_URL = RAW_BASE.replace(/\/$/, '');

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError<any>) => {
    let message = 'Erro de rede.';
    if (err.response) {
      const data = err.response.data as any;
      message =
        (typeof data === 'string' && data) ||
        data?.detail ||
        data?.message ||
        data?.error ||
        `HTTP ${err.response.status}`;
    } else if (err.message) {
      message = err.message;
    }
    return Promise.reject(new Error(message));
  }
);
