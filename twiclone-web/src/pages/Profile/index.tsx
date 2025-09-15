import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import type { ProfileView, Tweet } from '../../lib/realApi';
import { useAuth } from '../../store/auth';
import TweetCard from '../../components/TweetCard';
import {
  Wrap,
  Header,
  Banner,
  BannerActions,
  AvatarWrap,
  AvatarImg,
  NameHandle,
  Counters,
  Actions,
  SmallBtn,
  List,
  HiddenFile,
} from './style';

type UserLike = {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  banner_url?: string;
};

function extractUser(p?: ProfileView): UserLike {
  const anyp: any = p ?? {};
  return (anyp.user as UserLike) ?? (anyp as UserLike) ?? {};
}

function fallbackAvatar(username?: string) {
  const seed = username || 'user';
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(seed)}`;
}

function getFollowersCount(p?: ProfileView): number {
  const anyp: any = p ?? {};
  if (typeof anyp.followers_count === 'number') return anyp.followers_count;
  if (Array.isArray(anyp.followers)) return anyp.followers.length;
  if (typeof anyp.followers === 'number') return anyp.followers;
  return 0;
}

function getFollowingCount(p?: ProfileView): number {
  const anyp: any = p ?? {};
  if (typeof anyp.following_count === 'number') return anyp.following_count;
  if (Array.isArray(anyp.following)) return anyp.following.length;
  if (typeof anyp.following === 'number') return anyp.following;
  return 0;
}

export default function Profile() {
  const { handle = '' } = useParams<{ handle: string }>();
  const { user, setUser } = useAuth();
  const qc = useQueryClient();

  const isMe = user?.username === handle;

  // dados
  const { data: profile } = useQuery<ProfileView>({
    queryKey: ['profile', handle],
    queryFn: () => RealAPI.profileByHandle(handle),
    enabled: !!handle,
  });

  const { data: tweets = [] } = useQuery<Tweet[]>({
    queryKey: ['tweets', 'by', handle],
    queryFn: () => RealAPI.tweetsByHandle(handle),
    enabled: !!handle,
  });

  // derivados
  const u = extractUser(profile);

  const avatarSrc = useMemo(
    () => (u.avatar_url ? u.avatar_url : fallbackAvatar(u.username)),
    [u.avatar_url, u.username]
  );

  const bannerSrc = u.banner_url || '';

  const onPickAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const res = await RealAPI.uploadAvatar(file); // { url }
      if (isMe && user) setUser({ ...user, avatar_url: res.url });
      qc.invalidateQueries({ queryKey: ['profile', handle] });
    },
    [handle, isMe, qc, setUser, user]
  );

  const onPickBanner = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const res = await RealAPI.uploadBanner(file); // { url }
      if (isMe && user) setUser({ ...user, banner_url: res.url });
      qc.invalidateQueries({ queryKey: ['profile', handle] });
    },
    [handle, isMe, qc, setUser, user]
  );

  const followersCount = getFollowersCount(profile);
  const followingCount = getFollowingCount(profile);

  if (!profile) {
    return <div style={{ padding: 16 }}>Carregando…</div>;
  }

  // ids estáveis para htmlFor
  const avatarInputId = 'avatar-file';
  const bannerInputId = 'banner-file';

  return (
    <Wrap>
      <Header>
        <Banner $src={bannerSrc}>
          {isMe && (
            <BannerActions>
              <HiddenFile id={bannerInputId} accept="image/*" onChange={onPickBanner} />
              <SmallBtn as="label" htmlFor={bannerInputId}>
                Trocar capa
              </SmallBtn>
            </BannerActions>
          )}
        </Banner>

        <AvatarWrap>
          <AvatarImg src={avatarSrc} alt="" />
          {isMe && (
            <>
              <HiddenFile id={avatarInputId} accept="image/*" onChange={onPickAvatar} />
              <SmallBtn as="label" htmlFor={avatarInputId}>
                Trocar foto
              </SmallBtn>
            </>
          )}
        </AvatarWrap>

        <NameHandle>
          <strong>{u.display_name || u.username}</strong>
          <span>@{u.username}</span>
        </NameHandle>

        <Counters>
          Seguidores: {followersCount} · Seguindo: {followingCount}
        </Counters>

        <Actions>{/* ações extras */}</Actions>
      </Header>

      <List>
        {tweets.map((t) => (
          <TweetCard key={t.id} tweet={t} />
        ))}
      </List>
    </Wrap>
  );
}
