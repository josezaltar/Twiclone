// src/lib/http.ts
import axios from 'axios';

// 🔥 URL fixa para desenvolvimento
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Helper para setar/remover o Authorization
export function setAuthToken(token?: string) {
  if (token && token.trim()) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
}

// Log básico de erros
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[HTTP ERROR]', err?.response?.data || err?.message);
    return Promise.reject(err);
  }
);