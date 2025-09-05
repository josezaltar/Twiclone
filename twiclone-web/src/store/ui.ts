// src/store/ui.ts
import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type UIState = {
  themeMode: ThemeMode;
  toggleTheme: () => void;

  // busca (usado pelo SearchInput)
  search: string;
  setSearch: (q: string) => void;
};

function getInitialTheme(): ThemeMode {
  try {
    const v = localStorage.getItem('tw_theme');
    if (v === 'light' || v === 'dark') return v;
  } catch {}
  return 'dark';
}

export const useUIStore = create<UIState>((set, get) => ({
  themeMode: getInitialTheme(),
  toggleTheme: () =>
    set(s => {
      const next = s.themeMode === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('tw_theme', next);
      } catch {}
      return { themeMode: next };
    }),

  search: '',
  setSearch: (q: string) => set({ search: q }),
}));
