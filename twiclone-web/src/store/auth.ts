// src/store/auth.ts
import { create } from 'zustand';
import { RealAPI } from '../lib/realApi';
import { setAuthToken } from '../lib/http';
import type { User } from '../types/user';

type AuthState = {
  user: User | null;
  token: string | null;
  login: (handle: string, password: string) => Promise<void>;
  register: (handle: string, displayName: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User) => void;
  restore: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  setUser: (u) => set({ user: u }),

  restore: async () => {
    let saved = '';
    try {
      saved = localStorage.getItem('twiclone_token') || '';
    } catch {}
    if (!saved) return;
    setAuthToken(saved);
    set({ token: saved });
    try {
      const me = await RealAPI.me();
      set({ user: me });
    } catch {
      setAuthToken(undefined);
      set({ token: null, user: null });
      try {
        localStorage.removeItem('twiclone_token');
      } catch {}
    }
  },

  login: async (handle, password) => {
    const access = await RealAPI.login(handle, password);
    setAuthToken(access);
    set({ token: access });
    try {
      localStorage.setItem('twiclone_token', access);
    } catch {}
    const me = await RealAPI.me();
    set({ user: me });
  },

  register: async (handle, displayName, password) => {
    await RealAPI.register(handle, displayName, password);
    await get().login(handle, password);
  },

  logout: () => {
    setAuthToken(undefined);
    set({ token: null, user: null });
    try {
      localStorage.removeItem('twiclone_token');
    } catch {}
  },
}));