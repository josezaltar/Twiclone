// src/types/tweet.ts
import type { User } from './user';

export type Tweet = {
  id: number;
  text: string;
  created_at: string;
  author: Pick<User, 'id' | 'username' | 'display_name' | 'avatar_url'>;
  like_count: number;
  retweet_count: number;
  liked?: boolean;
  retweeted?: boolean;
};
