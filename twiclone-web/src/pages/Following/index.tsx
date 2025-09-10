// src/pages/Following/index.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
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

export default function Following() {
  const { handle = '' } = useParams();

  const q = useQuery({
    queryKey: ['following', handle],
    queryFn: () => RealAPI.followingByHandle(handle),
    enabled: !!handle,
  });

  if (!handle) return <ErrorMessage>Handle não informado.</ErrorMessage>;
  if (q.isLoading) return <Loading>Carregando…</Loading>;
  if (q.isError) return <ErrorMessage>Erro ao carregar.</ErrorMessage>;

  return (
    <Main>
      <Title>Seguindo @{handle}</Title>
      <List>
        {q.data?.map((row) => (
          <ListItem key={row.user.id}>
            <UserName>
              {row.user.display_name} @{row.user.username}
            </UserName>
            <FollowButtonWrapper>
              <FollowButton
                handle={row.user.username}
                initiallyFollowing={row.isFollowing}
              />
            </FollowButtonWrapper>
          </ListItem>
        ))}
      </List>
    </Main>
  );
}