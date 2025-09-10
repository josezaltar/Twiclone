// src/types/tweet.ts
import type { UserMini } from './user';

export type Tweet = {
  id: number;
  text: string;
  created_at: string;
  author: UserMini;
  like_count: number;
  retweet_count: number;
};
