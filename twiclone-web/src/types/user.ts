// src/types/user.ts
export type User = {
  id: number;
  /** username no backend (era "handle" no fake). */
  username: string;
  display_name: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
};
