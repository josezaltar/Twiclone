// src/store/auth.ts
import { create } from 'zustand';
import { RealAPI, setAuthToken } from '../lib/realApi';
import type { User } from '../types/user';

type AuthState = {
  user: User | null;
  token: string | null;
  // ações
  login: (handle: string, password: string) => Promise<void>;
  register: (handle: string, displayName: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User) => void;
  restore: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  setUser: (u: User) => set({ user: u }),

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null });
    try {
      localStorage.removeItem('twiclone_token');
    } catch {}
  },

  login: async (handle: string, password: string) => {
    const access = await RealAPI.login(handle, password);
    setAuthToken(access);
    set({ token: access });
    try {
      localStorage.setItem('twiclone_token', access);
    } catch {}
    const me = await RealAPI.me();
    set({ user: me });
  },

  register: async (handle: string, displayName: string, password: string) => {
    const u = await RealAPI.register(handle, displayName, password);
    // faz login automático após registrar
    const access = await RealAPI.login(handle, password);
    setAuthToken(access);
    set({ token: access, user: u });
    try {
      localStorage.setItem('twiclone_token', access);
    } catch {}
  },

  restore: async () => {
    const saved = (() => {
      try {
        return localStorage.getItem('twiclone_token');
      } catch {
        return null;
      }
    })();

    if (!saved) return;
    setAuthToken(saved);
    set({ token: saved });
    try {
      const me = await RealAPI.me();
      set({ user: me });
    } catch {
      // token inválido
      get().logout();
    }
  },
}));
