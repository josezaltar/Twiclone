// src/types/profile.ts
import type { User } from './user';

export type ProfileView = {
  user: User;
  followers: number;
  following: number;
  isFollowing: boolean;
};
