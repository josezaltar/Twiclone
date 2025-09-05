// src/lib/http.ts
import axios from 'axios';

function resolveBaseURL(): string {
  // 1) Vercel/Build: use a var de ambiente
  const env = process.env.REACT_APP_API_URL;

  // 2) Se não houver, tenta uma opção segura:
  //    - em produção, use o mesmo domínio (útil caso você use um proxy /api)
  //    - em dev, fallback para localhost:8000/api
  if (env && env.trim()) return env.trim();

  if (typeof window !== 'undefined') {
    // Se você tiver um proxy no vercel/nginx que aponte /api -> backend, isso funciona
    return '/api';
  }

  // Fallback para SSR/build (CRA não faz SSR, mas mantemos seguro)
  return 'http://localhost:8000/api';
}

export const http = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: false,
});

// Opcional: interceptor para logar erros (evita “tela branca silenciosa”)
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Você pode colocar um console.error aqui
    // console.error('[HTTP ERROR]', err?.response || err?.message);
    return Promise.reject(err);
  }
);
