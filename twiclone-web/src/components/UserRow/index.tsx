// src/components/UserRow/index.tsx
import React from 'react';
import type { User } from '../../types/user';
import FollowButton from '../FollowButton';
import { Row, Left, Avatar, Info, Name, Handle } from './style';

type Props = {
  user: User;
  isFollowing?: boolean;
  showFollow?: boolean;
  className?: string;
};

function UserRow({ user, isFollowing = false, showFollow = true, className }: Props) {
  const handle = (user.username || '').trim();
  const display = (user.display_name || handle || 'Usuário').trim();

  const avatarUrl =
    (user.avatar_url && user.avatar_url.trim()) ||
    `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(handle || 'anon')}`;

  return (
    <Row className={className}>
      <Left>
        <Avatar
          src={avatarUrl}
          alt={`Avatar de ${display}`}
          loading="lazy"
          decoding="async"
        />
        <Info>
          <Name title={display}>{display}</Name>
          <Handle>@{handle}</Handle>
        </Info>
      </Left>

      {showFollow && handle && (
        <FollowButton handle={handle} initiallyFollowing={isFollowing} />
      )}
    </Row>
  );
}

export default React.memo(UserRow);
