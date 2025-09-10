// src/lib/realApi.ts
import { http, setAuthToken } from './http';

/** ====== Tipos vindos do backend ====== */
export type User = {
  id: number;
  username: string;
  email: string;
  display_name: string;
  bio: string;
  location: string;
  website: string;
  avatar_url: string;
  banner_url: string;
};

export type UserMini = {
  id: number;
  username: string;
  display_name: string;
  avatar_url?: string;
  banner_url?: string;
};

export type Tweet = {
  id: number;
  text: string;
  created_at: string;
  author: UserMini;
  like_count: number;
  retweet_count: number;
};

export type ProfileView = {
  user: User;
  followers: number;
  following: number;
};

export type FollowEntry = {
  user: UserMini;
  isFollowing: boolean;
};

/** ====== Auth ====== */
async function register(handle: string, displayName: string, password: string): Promise<User> {
  const { data } = await http.post<User>('/auth/register/', {
    handle,
    display_name: displayName,
    password,
  });
  return data;
}

async function login(handle: string, password: string): Promise<string> {
  const { data } = await http.post<{ token: string }>('/auth/login/', {
    handle,
    password,
  });
  return data.token;
}

async function me(): Promise<User> {
  const { data } = await http.get<User>('/auth/me/');
  return data;
}

/** ====== Tweets ====== */
async function listTweets(scope: 'all' | 'following' = 'all'): Promise<Tweet[]> {
  const { data } = await http.get<Tweet[]>('/tweets/', { params: { scope } });
  return data;
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

async function toggleRetweet(tweetId: number): Promise<{ retweeted: boolean; retweet_count: number }> {
  const { data } = await http.post<{ retweeted: boolean; retweet_count: number }>(
    `/tweets/${tweetId}/retweet/toggle/`
  );
  return data;
}

async function tweetsByHandle(handle: string): Promise<Tweet[]> {
  const { data } = await http.get<Tweet[]>(`/profiles/${handle}/tweets/`);
  return data;
}

/** ====== Perfil / Follow ====== */
async function profileByHandle(handle: string): Promise<ProfileView> {
  const { data } = await http.get<ProfileView>(`/profiles/${handle}/`);
  return data;
}

async function followersByHandle(handle: string): Promise<FollowEntry[]> {
  const { data } = await http.get<FollowEntry[]>(`/profiles/${handle}/followers/`);
  return data;
}

async function followingByHandle(handle: string): Promise<FollowEntry[]> {
  const { data } = await http.get<FollowEntry[]>(`/profiles/${handle}/following/`);
  return data;
}

async function toggleFollowById(userId: number): Promise<{ following: boolean }> {
  const { data } = await http.post<{ following: boolean }>(`/users/${userId}/follow/toggle/`);
  return data;
}

async function toggleFollowByHandle(handle: string): Promise<{ following: boolean }> {
  const { data } = await http.post<{ following: boolean }>(`/profiles/${handle}/follow/toggle/`);
  return data;
}

async function myFollowingIds(): Promise<number[]> {
  const { data } = await http.get<number[]>('/me/following/ids/');
  return data;
}

async function updateMyProfile(payload: Partial<Pick<User, 'display_name' | 'bio' | 'location' | 'website'>>): Promise<User> {
  const { data } = await http.patch<User>('/me/profile/', payload);
  return data;
}

async function uploadAvatar(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append('avatar', file);
  const { data } = await http.post<{ url: string }>('/me/avatar/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

async function uploadBanner(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append('banner', file);
  const { data } = await http.post<{ url: string }>('/me/banner/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}



export const RealAPI = {
  // auth
  register,
  login,
  me,

  // tweets
  listTweets,
  createTweet,
  toggleLike,
  toggleRetweet,
  tweetsByHandle,

  // perfil / follow
  profileByHandle,
  followersByHandle,
  followingByHandle,
  toggleFollowById,
  toggleFollowByHandle,
  myFollowingIds,
  updateMyProfile,
  uploadAvatar,
  uploadBanner,
};

export { setAuthToken } from './http';
export default RealAPI;
