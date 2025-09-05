// src/components/UserRow/index.tsx
import { User } from '../../types/user';
import FollowButton from '../FollowButton';
import { Row, Left, Avatar, Info, Name, Handle } from './style';

type Props = {
  user: User;
  isFollowing?: boolean;
  showFollow?: boolean;
};

export default function UserRow({ user, isFollowing = false, showFollow = true }: Props) {
  return (
    <Row>
      <Left>
        <Avatar
          src={
            user.avatar_url ||
            `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
          }
          alt=""
        />
        <Info>
          <Name>{user.display_name || user.username}</Name>
          <Handle>@{user.username}</Handle>
        </Info>
      </Left>
      {showFollow && (
        <FollowButton targetUserId={user.id} isFollowing={isFollowing} size="sm" />
      )}
    </Row>
  );
}
