import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { useAuth } from './store/auth';
import { useUIStore } from './store/ui';

import { GlobalStyle } from './styles/global';     // <- caminho correto
import { themes } from './styles/theme';           // <- agora exportado no theme.ts

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30_000 },
  },
});

function Boot() {
  // restaura sessão/token ao iniciar
  React.useEffect(() => {
    useAuth.getState().restore();
  }, []);

  const mode = useUIStore((s) => s.themeMode) || 'dark'; // 'light' | 'dark'
  const theme = themes[mode];

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Boot />
  </React.StrictMode>
);
