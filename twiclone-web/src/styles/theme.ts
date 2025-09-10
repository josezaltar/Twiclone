// src/styles/theme.ts
import type { DefaultTheme } from 'styled-components';

const base = {
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,.2)',
    md: '0 6px 20px rgba(0,0,0,.25)',
  },
  radius: {
    sm: '8px',
    md: '16px',
    pill: '999px',
  },
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    bg: '#000000',
    text: '#E5E7EB',
    muted: '#9CA3AF',
    border: '#1F2937',
    card: '#0B0B0B',
    input: '#0F1214',
    hover: 'rgba(255,255,255,.06)',
    primary: '#E6F35E',
    primaryText: '#000000',
  },
  ...base,
};

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    bg: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    card: '#FFFFFF',
    input: '#F3F4F6',
    hover: 'rgba(0,0,0,.06)',
    primary: '#111827',
    primaryText: '#FFFFFF',
  },
  ...base,
};

// Exporta o dicionário para facilitar a seleção no index.tsx
export const themes: Record<'light' | 'dark', DefaultTheme> = {
  light: lightTheme,
  dark: darkTheme,
};
