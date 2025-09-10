// src/pages/Feed/index.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import Compose from '../../components/Compose';
import TweetCard from '../../components/TweetCard';
import { Main, Title, Loading, ErrorMessage } from './style';

export default function Feed() {
  const q = useQuery({
    queryKey: ['tweets', 'following'],
    queryFn: () => RealAPI.listTweets('following'),
  });

  return (
    <Main>
      <Title>Timeline (seguindo)</Title>
      <Compose onCreated={() => q.refetch()} />
      {q.isLoading && <Loading>Carregando…</Loading>}
      {q.isError && <ErrorMessage>Erro ao carregar.</ErrorMessage>}
      {q.data?.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </Main>
  );
}