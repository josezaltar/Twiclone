// src/types/user.ts
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
