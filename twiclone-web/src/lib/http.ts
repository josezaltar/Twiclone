// src/lib/http.ts
import axios from 'axios';

/**
 * Resolve a baseURL segura:
 * - Em produção, use REACT_APP_API_URL (Netlify).
 * - Se não houver, tenta "/api" (caso você proxie no host).
 * - Fallback de dev: http://localhost:8000/api
 */
function resolveBaseURL(): string {
  const env = process.env.REACT_APP_API_URL?.trim();

  if (env) return env;

  if (typeof window !== 'undefined') {
    // Se você não usa proxy no Netlify, mantenha REACT_APP_API_URL setada.
    // Mesmo assim deixo "/api" como segunda opção.
    return '/api';
  }

  return 'http://localhost:8000/api';
}

export const http = axios.create({
  baseURL: resolveBaseURL(),
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

// (Opcional) log básico de erros — evita “tela branca silenciosa”
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // console.error('[HTTP ERROR]', err?.response || err?.message);
    return Promise.reject(err);
  }
);
