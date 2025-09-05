// src/pages/Profile/index.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RealAPI as FakeAPI, Tweet, ProfileView } from '../../lib/realApi';
import TweetCard from '../../components/TweetCard';
import AvatarUpload from '../../components/AvatarUpload';
import BannerUpload from '../../components/BannerUpload';
import { useAuthStore } from '../../store/auth';

import {
  Container,
  BannerWrap,
  BannerImg,
  BannerAction,
  HeaderRow,
  Avatar,
  Content,
  DisplayName,
  Username,
  Bio,
  StatsRow,
  Divider,
  NotFound,
} from './style';

export default function Profile() {
  const { handle } = useParams<{ handle: string }>();
  const { user } = useAuthStore();
  const isOwner = user?.username === handle;

  const { data: profile } = useQuery<ProfileView | null>({
    queryKey: ['profile', handle, user?.id],
    queryFn: () => FakeAPI.getProfileByHandle(handle!),
    enabled: !!handle,
    retry: false,
  });

  const { data: tweets = [] } = useQuery<Tweet[]>({
    queryKey: ['tweets', 'profile', handle, user?.id],
    queryFn: () => FakeAPI.listTweetsByAuthorHandle(handle!),
    enabled: !!handle && !!profile,
  });

  if (!profile) {
    return (
      <NotFound>Perfil não encontrado.</NotFound>
    );
  }

  const avatarSrc =
    profile.user.avatar_url ||
    `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.user.username}`;

  return (
    <Container>
      <BannerWrap>
        <BannerImg src={profile.user.banner_url ?? ''} alt="" />
        {isOwner && (
          <BannerAction>
            <BannerUpload buttonText="Trocar capa" />
          </BannerAction>
        )}

        <HeaderRow>
          <Avatar src={avatarSrc} alt="" />
          {isOwner && <AvatarUpload buttonText="Trocar foto" />}
        </HeaderRow>
      </BannerWrap>

      <Content>
        <DisplayName>{profile.user.display_name || profile.user.username}</DisplayName>
        <Username>@{profile.user.username}</Username>
        {!!profile.user.bio && <Bio>{profile.user.bio}</Bio>}

        <StatsRow>
          <span>
            <b>{profile.following}</b> seguindo
          </span>
          <span>
            <b>{profile.followers}</b> seguidores
          </span>
        </StatsRow>
      </Content>

      <Divider />

      {tweets.map((t) => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </Container>
  );
}
