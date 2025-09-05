// src/lib/realApi.ts
import type { InternalAxiosRequestConfig } from 'axios';
import { http } from './http';
import type { User } from '../types/user';
import type { Tweet } from '../types/tweet';
import type { ProfileView } from '../types/profile';

/** Token em memória (usado pelo interceptor) */
let _token: string | null = null;
export function setAuthToken(token: string | null) {
  _token = token;
}

/** Anexa Authorization se houver token */
http.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  if (_token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${_token}`;
  }
  return cfg;
});

/* ===================== Auth ===================== */
async function login(handle: string, password: string) {
  const { data } = await http.post<{ token: string }>('/auth/login/', { handle, password });
  setAuthToken(data.token);
  return data.token;
}

async function register(handle: string, displayName: string, password: string) {
  const { data } = await http.post<User>('/auth/register/', {
    handle,
    display_name: displayName,
    password,
  });
  return data;
}

async function me() {
  const { data } = await http.get<User>('/auth/me/');
  return data;
}

/* ===================== Tweets ===================== */
/** Escopos aceitos pelo backend: 'all' | 'following'. Se não informar, assume 'all'. */
async function listTweets(scope?: 'all' | 'following'): Promise<Tweet[]> {
  const params = scope && scope !== 'all' ? { scope } : undefined;
  const { data } = await http.get<Tweet[]>('/tweets/', { params });
  return data ?? [];
}

async function listTweetsByAuthorHandle(handle: string): Promise<Tweet[]> {
  const { data } = await http.get<Tweet[]>(`/profiles/${handle}/tweets/`);
  return data ?? [];
}

async function createTweet(text: string): Promise<Tweet> {
  const { data } = await http.post<Tweet>('/tweets/', { text });
  return data;
}

async function toggleLike(tweetId: number): Promise<{ liked: boolean; like_count: number }> {
  const { data } = await http.post<{ liked: boolean; like_count: number }>(
    `/tweets/${tweetId}/like/toggle/`
  );
  return data;
}

async function toggleRetweet(
  tweetId: number
): Promise<{ retweeted: boolean; retweet_count: number }> {
  const { data } = await http.post<{ retweeted: boolean; retweet_count: number }>(
    `/tweets/${tweetId}/retweet/toggle/`
  );
  return data;
}

/* ===================== Perfil / Follow ===================== */
async function getProfileByHandle(handle: string): Promise<ProfileView | null> {
  const { data } = await http.get<ProfileView>(`/profiles/${handle}/`);
  return data ?? null;
}

async function listFollowersByHandle(
  handle: string
): Promise<{ user: User; isFollowing: boolean }[]> {
  const { data } = await http.get<{ user: User; isFollowing: boolean }[]>(
    `/profiles/${handle}/followers/`
  );
  return data ?? [];
}

async function listFollowingByHandle(
  handle: string
): Promise<{ user: User; isFollowing: boolean }[]> {
  const { data } = await http.get<{ user: User; isFollowing: boolean }[]>(
    `/profiles/${handle}/following/`
  );
  return data ?? [];
}

async function getFollowingIds(): Promise<number[]> {
  const { data } = await http.get<number[]>('/me/following/ids/');
  return data ?? [];
}

async function toggleFollow(targetUserId: number): Promise<{ following: boolean }> {
  const { data } = await http.post<{ following: boolean }>(`/users/${targetUserId}/follow/toggle/`);
  return data;
}

/** ➕ Seguir/Deixar de seguir usando apenas o @handle */
async function toggleFollowByHandle(handle: string): Promise<{ following: boolean }> {
  const { data } = await http.post<{ following: boolean }>(`/profiles/${handle}/follow/toggle/`);
  return data;
}

/* ===================== Atualizações de perfil ===================== */
async function updateProfile(payload: {
  display_name?: string;
  bio?: string;
  location?: string;
  website?: string;
}) {
  const { data } = await http.patch<User>('/me/profile/', payload);
  return data;
}

async function updateUserAvatar(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('avatar', file);
  const { data } = await http.post<{ url: string }>('/me/avatar/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
}

async function updateUserBanner(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('banner', file);
  const { data } = await http.post<{ url: string }>('/me/banner/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
}

export type { User, Tweet, ProfileView };

export const RealAPI = {
  // auth
  login,
  register,
  me,

  // tweets
  listTweets,
  listTweetsByAuthorHandle,
  createTweet,
  toggleLike,
  toggleRetweet,

  // perfil/follow
  getProfileByHandle,
  listFollowersByHandle,
  listFollowingByHandle,
  toggleFollow,
  toggleFollowByHandle,
  getFollowingIds,

  // updates
  updateProfile,
  updateUserAvatar,
  updateUserBanner,

  // token helper
  setAuthToken,
};
