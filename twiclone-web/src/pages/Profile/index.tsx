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
  AvatarWrap,
  AvatarImg,
  NameHandle,
  Counters,
  Actions,
  SmallBtn,
  List,
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
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
    seed
  )}`;
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

  // Hooks de dados (sempre chamados)
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

  // Hooks derivados (sempre chamados, lidando com undefined internamente)
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

  // Só aqui fazemos returns condicionais (depois de todos os hooks)
  if (!profile) {
    return <div style={{ padding: 16 }}>Carregando…</div>;
  }

  return (
    <Wrap>
      <Header>
        <Banner $src={bannerSrc}>
          {isMe && (
            <label>
              <SmallBtn as="span">Trocar capa</SmallBtn>
              <input type="file" accept="image/*" hidden onChange={onPickBanner} />
            </label>
          )}
        </Banner>

        <AvatarWrap>
          <AvatarImg src={avatarSrc} alt="" />
          {isMe && (
            <label>
              <SmallBtn as="span">Trocar foto</SmallBtn>
              <input type="file" accept="image/*" hidden onChange={onPickAvatar} />
            </label>
          )}
        </AvatarWrap>

        <NameHandle>
          <strong>{u.display_name || u.username}</strong>
          <span>@{u.username}</span>
        </NameHandle>

        <Counters>
          Seguidores: {followersCount} · Seguindo: {followingCount}
        </Counters>

        <Actions>{/* ações extras se quiser */}</Actions>
      </Header>

      <List>
        {tweets.map((t) => (
          <TweetCard key={t.id} tweet={t} />
        ))}
      </List>
    </Wrap>
  );
}
