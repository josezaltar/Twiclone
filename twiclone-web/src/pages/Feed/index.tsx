// src/pages/Feed/index.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import Compose from '../../components/Compose';
import TweetCard from '../../components/TweetCard';
import { Main, Title, Loading, ErrorMessage, TabBar, Tab } from './style';

export default function Feed() {
  const [scope, setScope] = useState<'all' | 'following'>('all');

  const q = useQuery({
    queryKey: ['tweets', scope],
    queryFn: () => RealAPI.listTweets(scope),
  });

  return (
    <Main>
      <Title>Timeline</Title>
      
      <TabBar>
        <Tab 
          $active={scope === 'all'} 
          onClick={() => setScope('all')}
        >
          Para você
        </Tab>
        <Tab 
          $active={scope === 'following'} 
          onClick={() => setScope('following')}
        >
          Seguindo
        </Tab>
      </TabBar>

      <Compose onCreated={() => q.refetch()} />
      {q.isLoading && <Loading>Carregando…</Loading>}
      {q.isError && <ErrorMessage>Erro ao carregar.</ErrorMessage>}
      {q.data?.map((t) => <TweetCard key={t.id} tweet={t} />)}
    </Main>
  );
}