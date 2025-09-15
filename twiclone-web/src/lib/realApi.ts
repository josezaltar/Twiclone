// src/lib/realApi.ts
import { http } from './http';
import type { User } from '../types/user';

export type Tweet = {
  id: number;
  text: string;
  created_at: string;
  author: {
    id: number;
    username: string;
    display_name: string;
    avatar_url?: string;
    banner_url?: string;
  };
  like_count: number;
  retweet_count: number;
  liked?: boolean;
  retweeted?: boolean;
};

export type ProfileView = {
  user?: User;
  followers?: number[] | any[];
  following?: number[] | any[];
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
};

// ---------- helpers ----------
function backendOrigin(): string {
  try {
    const base = http.defaults.baseURL || '/api';
    const u = new URL(base, window.location.origin);
    return u.origin;
  } catch {
    return '';
  }
}

function toAbsolute(url?: string): string {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  const origin = backendOrigin();
  return origin + (url.startsWith('/') ? url : '/' + url);
}

// ---------- auth token ----------
let ACCESS_TOKEN: string | undefined;
export function setAuthToken(t?: string) {
  ACCESS_TOKEN = t;
  if (t) http.defaults.headers.common['Authorization'] = `Bearer ${t}`;
  else delete http.defaults.headers.common['Authorization'];
}

// ---------- API ----------
export const RealAPI = {
  // --- Auth ---
  async register(handle: string, displayName: string, password: string): Promise<User> {
    const r = await http.post('/auth/register/', {
      handle,
      display_name: displayName,
      password,
    });
    return r.data;
  },

  async login(handle: string, password: string): Promise<string> {
    const r = await http.post('/auth/login/', { handle, password });
    return r.data?.token as string;
  },

  async me(): Promise<User> {
    const r = await http.get('/auth/me/');
    const me: User = r.data;
    me.avatar_url = toAbsolute(me.avatar_url);
    me.banner_url = toAbsolute(me.banner_url);
    return me;
  },

  // --- Profile (me) ---
  async updateMyProfile(payload: {
    display_name?: string;
    bio?: string;
    location?: string;
    website?: string;
  }): Promise<User> {
    const r = await http.post('/me/profile/', payload);
    const u: User = r.data;
    u.avatar_url = toAbsolute(u.avatar_url);
    u.banner_url = toAbsolute(u.banner_url);
    return u;
  },

  // Envia FormData SEM forçar "Content-Type" (o navegador define o boundary).
  // Tenta nomes de campo e métodos alternativos para compatibilizar com a view do DRF.
  async uploadAvatar(file: File): Promise<{ url: string }> {
    const toForm = (field: string) => {
      const fd = new FormData();
      fd.append(field, file);
      return fd;
    };

    // 1) POST com 'file'
    try {
      const r = await http.post('/me/avatar/', toForm('file'));
      return { url: toAbsolute(r.data?.url) };
    } catch (e1: any) {
      // 2) POST com 'avatar'
      try {
        const r = await http.post('/me/avatar/', toForm('avatar'));
        return { url: toAbsolute(r.data?.url) };
      } catch (e2: any) {
        // 3) PUT com 'avatar'
        try {
          const r = await http.put('/me/avatar/', toForm('avatar'));
          return { url: toAbsolute(r.data?.url) };
        } catch (e3) {
          // útil para depuração
          // console.error('[uploadAvatar]', e1?.response?.data || e1);
          // console.error('[uploadAvatar]', e2?.response?.data || e2);
          // console.error('[uploadAvatar]', e3?.response?.data || e3);
          throw e3;
        }
      }
    }
  },

  async uploadBanner(file: File): Promise<{ url: string }> {
    const toForm = (field: string) => {
      const fd = new FormData();
      fd.append(field, file);
      return fd;
    };

    try {
      const r = await http.post('/me/banner/', toForm('file'));
      return { url: toAbsolute(r.data?.url) };
    } catch (e1: any) {
      try {
        const r = await http.post('/me/banner/', toForm('banner'));
        return { url: toAbsolute(r.data?.url) };
      } catch (e2: any) {
        try {
          const r = await http.put('/me/banner/', toForm('banner'));
          return { url: toAbsolute(r.data?.url) };
        } catch (e3) {
          // console.error('[uploadBanner]', e1?.response?.data || e1);
          // console.error('[uploadBanner]', e2?.response?.data || e2);
          // console.error('[uploadBanner]', e3?.response?.data || e3);
          throw e3;
        }
      }
    }
  },

  // --- Tweets / timeline ---
  // aceita um escopo opcional para manter compatível com chamadas existentes
  async listTweets(scope?: 'following' | 'all'): Promise<Tweet[]> {
    // hoje usamos o mesmo endpoint; se no futuro tiver /tweets/all/, trate aqui
    const r = await http.get('/tweets/');
    return (r.data as Tweet[]).map((t) => ({
      ...t,
      author: {
        ...t.author,
        avatar_url: toAbsolute(t.author?.avatar_url),
        banner_url: toAbsolute(t.author?.banner_url),
      },
    }));
  },

  async createTweet(text: string): Promise<Tweet> {
    const r = await http.post('/tweets/', { text });
    const t = r.data as Tweet;
    t.author.avatar_url = toAbsolute(t.author?.avatar_url);
    t.author.banner_url = toAbsolute(t.author?.banner_url);
    return t;
  },

  async toggleLike(id: number): Promise<{ liked: boolean; like_count: number }> {
    const r = await http.post(`/tweets/${id}/like/toggle/`);
    return r.data;
  },

  async toggleRetweet(id: number): Promise<{ retweeted: boolean; retweet_count: number }> {
    const r = await http.post(`/tweets/${id}/retweet/toggle/`);
    return r.data;
  },

  // --- Profiles (outros usuários) ---
  async profileByHandle(handle: string): Promise<ProfileView> {
    const r = await http.get(`/profiles/${handle}/`);
    const p = r.data as ProfileView;
    if (p?.user) {
      p.user.avatar_url = toAbsolute(p.user.avatar_url);
      p.user.banner_url = toAbsolute(p.user.banner_url);
    }
    return p;
  },

  async tweetsByHandle(handle: string): Promise<Tweet[]> {
    const r = await http.get(`/profiles/${handle}/tweets/`);
    return (r.data as Tweet[]).map((t) => ({
      ...t,
      author: {
        ...t.author,
        avatar_url: toAbsolute(t.author?.avatar_url),
        banner_url: toAbsolute(t.author?.banner_url),
      },
    }));
  },

  async followersByHandle(handle: string): Promise<
    { user: User; isFollowing: boolean }[]
  > {
    const r = await http.get(`/profiles/${handle}/followers/`);
    return (r.data as any[]).map((row) => ({
      user: {
        ...(row.user as User),
        avatar_url: toAbsolute(row.user?.avatar_url),
        banner_url: toAbsolute(row.user?.banner_url),
      },
      isFollowing: !!row.isFollowing,
    }));
  },

  async followingByHandle(handle: string): Promise<
    { user: User; isFollowing: boolean }[]
  > {
    const r = await http.get(`/profiles/${handle}/following/`);
    return (r.data as any[]).map((row) => ({
      user: {
        ...(row.user as User),
        avatar_url: toAbsolute(row.user?.avatar_url),
        banner_url: toAbsolute(row.user?.banner_url),
      },
      isFollowing: !!row.isFollowing,
    }));
  },

  async toggleFollowByHandle(handle: string): Promise<{ following: boolean }> {
    const r = await http.post(`/profiles/${handle}/follow/toggle/`);
    return r.data;
  },
};

export type { User };
