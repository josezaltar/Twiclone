// src/pages/Following/index.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import { useAuth } from '../../store/auth';
import {
  Main,
  Title,
  Loading,
  ErrorMessage,
  Grid,
  UserCard,
  AvatarWrapper,
  Avatar,
  UserInfo,
  Name,
  Handle,
  Bio,
  Stats,
  FollowBtn,
} from './style';

export default function Following() {
  const { handle: handleParam } = useParams<{ handle?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const handle = handleParam ?? user?.username ?? '';

  const { data: rows = [], isLoading, isError } = useQuery({
    queryKey: ['following', handle],
    queryFn: () => RealAPI.followingByHandle(handle),
    enabled: !!handle,
  });

  const followMut = useMutation({
    mutationFn: (targetHandle: string) => RealAPI.toggleFollowByHandle(targetHandle),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['following', handle] });
    },
  });

  if (!handle) return <ErrorMessage>Handle não informado.</ErrorMessage>;
  if (isLoading) return <Loading>Carregando…</Loading>;
  if (isError) return <ErrorMessage>Erro ao carregar.</ErrorMessage>;

  return (
    <Main>
      <Title>Seguindo · @{handle}</Title>
      
      {rows.length === 0 ? (
        <ErrorMessage>Nenhum usuário seguido ainda.</ErrorMessage>
      ) : (
        <Grid>
          {rows.map((row) => (
            <UserCard key={row.user.id}>
              <div onClick={() => navigate(`/${row.user.username}`)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <AvatarWrapper>
                  <Avatar
                    src={
                      row.user.avatar_url ||
                      `https://api.dicebear.com/7.x/identicon/svg?seed=${row.user.username}`
                    }
                    alt={row.user.display_name || row.user.username}
                  />
                </AvatarWrapper>
                <UserInfo>
                  <Name>{row.user.display_name || row.user.username}</Name>
                  <Handle>@{row.user.username}</Handle>
                  {row.user.bio && <Bio>{row.user.bio}</Bio>}
                  <Stats>
                    {row.user.location && <span>📍 {row.user.location}</span>}
                  </Stats>
                </UserInfo>
              </div>
              <FollowBtn
                $following={row.isFollowing}
                onClick={(e) => {
                  e.stopPropagation();
                  followMut.mutate(row.user.username);
                }}
                disabled={followMut.isPending}
              >
                {row.isFollowing ? 'Seguindo' : 'Seguir'}
              </FollowBtn>
            </UserCard>
          ))}
        </Grid>
      )}
    </Main>
  );
}