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
  reply_count: number;
  reply_to?: number | null;
  liked?: boolean;
  retweeted?: boolean;
  is_following?: boolean;
};

export type ProfileView = {
  user?: User;
  followers?: number[] | any[];
  following?: number[] | any[];
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
};

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

export const RealAPI = {
  async register(handle: string, displayName: string, password: string): Promise<User> {
    const r = await http.post('/register/', {
      handle,
      display_name: displayName,
      password,
    });
    return r.data;
  },

  async login(handle: string, password: string): Promise<string> {
    const r = await http.post('/login/', { handle, password });
    return r.data?.token as string;
  },

  async me(): Promise<User> {
    const r = await http.get('/me/');
    const me: User = r.data;
    me.avatar_url = toAbsolute(me.avatar_url);
    me.banner_url = toAbsolute(me.banner_url);
    return me;
  },

  async updateMyProfile(payload: {
  display_name?: string;
  bio?: string;
  location?: string;
  website?: string;
}): Promise<User> {
  const r = await http.patch('/me/profile/', payload);  // ← Mudei de post para patch
  const u: User = r.data;
  u.avatar_url = toAbsolute(u.avatar_url);
  u.banner_url = toAbsolute(u.banner_url);
  return u;
},

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await http.post('/me/change-password/', {
      current_password: currentPassword,
      new_password: newPassword,
    });
  },

  async uploadAvatar(file: File): Promise<{ url: string }> {
    const fd = new FormData();
    fd.append('avatar', file);
    const r = await http.post('/me/upload-avatar/', fd);
    return { url: toAbsolute(r.data?.url) };
  },

  async uploadBanner(file: File): Promise<{ url: string }> {
    const fd = new FormData();
    fd.append('banner', file);
    const r = await http.post('/me/upload-banner/', fd);
    return { url: toAbsolute(r.data?.url) };
  },

  async listTweets(scope?: 'following' | 'all'): Promise<Tweet[]> {
    const params = scope ? { scope } : {};
    const r = await http.get('/tweets/', { params });
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

  async getTweetReplies(tweetId: number): Promise<Tweet[]> {
    const r = await http.get(`/tweets/${tweetId}/replies/`);
    return (r.data as Tweet[]).map((t) => ({
      ...t,
      author: {
        ...t.author,
        avatar_url: toAbsolute(t.author?.avatar_url),
        banner_url: toAbsolute(t.author?.banner_url),
      },
    }));
  },

  async createReply(tweetId: number, text: string): Promise<Tweet> {
    const r = await http.post(`/tweets/${tweetId}/reply/`, { text });
    const t = r.data as Tweet;
    t.author.avatar_url = toAbsolute(t.author?.avatar_url);
    t.author.banner_url = toAbsolute(t.author?.banner_url);
    return t;
  },

  async toggleLike(id: number): Promise<{ liked: boolean; like_count: number }> {
    const r = await http.post(`/tweets/${id}/like/`);
    return r.data;
  },

  async toggleRetweet(id: number): Promise<{ retweeted: boolean; retweet_count: number }> {
    const r = await http.post(`/tweets/${id}/retweet/`);
    return r.data;
  },

  async profileByHandle(handle: string): Promise<ProfileView> {
    const r = await http.get(`/users/${handle}/`);
    const p = r.data as ProfileView;
    if (p?.user) {
      p.user.avatar_url = toAbsolute(p.user.avatar_url);
      p.user.banner_url = toAbsolute(p.user.banner_url);
    }
    return p;
  },

  async tweetsByHandle(handle: string): Promise<Tweet[]> {
    const r = await http.get(`/users/${handle}/tweets/`);
    return (r.data as Tweet[]).map((t) => ({
      ...t,
      author: {
        ...t.author,
        avatar_url: toAbsolute(t.author?.avatar_url),
        banner_url: toAbsolute(t.author?.banner_url),
      },
    }));
  },

  async followersByHandle(handle: string): Promise<Array<{ user: User; isFollowing: boolean }>> {
    const r = await http.get(`/users/${handle}/followers/`);
    return (r.data as any[]).map((row) => ({
      user: {
        ...(row.user as User),
        avatar_url: toAbsolute(row.user?.avatar_url),
        banner_url: toAbsolute(row.user?.banner_url),
      },
      isFollowing: !!row.isFollowing,
    }));
  },

  async followingByHandle(handle: string): Promise<Array<{ user: User; isFollowing: boolean }>> {
    const r = await http.get(`/users/${handle}/following/`);
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
    const r = await http.post(`/follow/by-handle/${handle}/`);
    return r.data;
  },
};

export type { User };