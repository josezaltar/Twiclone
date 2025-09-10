import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import type { UserMini } from '../../types/user';
import { useAuth } from '../../store/auth';
import FollowButton from '../../components/FollowButton';
import {
  ErrorMessage,
  Loading,
  Main,
  List,
  ListItem,
  Title,
  UserName,
  FollowButtonWrapper,
} from './style';

// O endpoint /profiles/:handle/following retorna uma lista de entradas:
// { user: UserMini; isFollowing?: boolean }
type FollowEntry = {
  user: UserMini;
  isFollowing?: boolean;
};

export default function Following() {
  const { handle: handleParam } = useParams<{ handle?: string }>();
  const { user } = useAuth();

  // Se não vier o handle na URL, usa o do usuário logado
  const handle = handleParam ?? user?.username ?? '';

  const {
    data: rows = [],
    isLoading,
    isError,
  } = useQuery<FollowEntry[]>({
    queryKey: ['following', handle],
    queryFn: () => RealAPI.followingByHandle(handle),
    enabled: !!handle,
  });

  if (!handle) return <ErrorMessage>Handle não informado.</ErrorMessage>;
  if (isLoading) return <Loading>Carregando…</Loading>;
  if (isError) return <ErrorMessage>Erro ao carregar.</ErrorMessage>;

  return (
    <Main>
      <Title>Seguindo @{handle}</Title>
      <List>
        {rows.map((row) => (
          <ListItem key={row.user.id}>
            <UserName>
              {row.user.display_name || row.user.username} @{row.user.username}
            </UserName>
            <FollowButtonWrapper>
              <FollowButton
                handle={row.user.username}
                // como esta lista é de "seguindo", assumimos true quando não vier do backend
                initiallyFollowing={row.isFollowing ?? true}
              />
            </FollowButtonWrapper>
          </ListItem>
        ))}
      </List>
    </Main>
  );
}
