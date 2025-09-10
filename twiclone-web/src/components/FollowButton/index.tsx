// src/components/FollowButton/index.tsx
import React, { useState } from 'react';
import { RealAPI } from '../../lib/realApi';

type Props = {
  handle: string;
  initiallyFollowing?: boolean;
};

export default function FollowButton({ handle, initiallyFollowing = false }: Props) {
  const [following, setFollowing] = useState(initiallyFollowing);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const r = await RealAPI.toggleFollowByHandle(handle);
      setFollowing(r.following);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={toggle} disabled={loading}>
      {following ? 'Deixar de seguir' : 'Seguir'}
    </button>
  );
}
