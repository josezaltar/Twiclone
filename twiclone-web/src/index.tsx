// src/index.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GlobalStyle } from './styles/GlobalStyle';
import { themes } from './styles/theme';
import { useUIStore } from './store/ui';
import { useAuthStore } from './store/auth';
import App from './App';
import { ErrorBoundary } from './ErrorBoundary';

const qc = new QueryClient();

function Root() {
  const mode = useUIStore((s) => s.themeMode);
  const { restore } = useAuthStore();

  useEffect(() => {
    // tenta restaurar o usuário (token no localStorage)
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = themes[mode as keyof typeof themes];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);