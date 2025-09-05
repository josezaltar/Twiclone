// src/pages/Feed/index.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import type { Tweet } from '../../types/tweet';
import Compose from '../../components/Compose';
import TweetCard from '../../components/TweetCard';
import { useAuthStore } from '../../store/auth';

import { Container, Filters, FilterButton, ComposeBar, Loading } from './style';

export default function Feed() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'following'>('all');

  const { data: tweets = [], isLoading } = useQuery<Tweet[]>({
    queryKey: ['tweets', filter, user?.id],
    // sua API expõe listTweets aceitando apenas o filtro
    queryFn: () => RealAPI.listTweets(filter),
  });

  return (
    <Container>
      <Filters>
        <FilterButton
          type="button"
          onClick={() => setFilter('all')}
          $active={filter === 'all'}
        >
          Tudo
        </FilterButton>

        <FilterButton
          type="button"
          onClick={() => setFilter('following')}
          $active={filter === 'following'}
        >
          Seguindo
        </FilterButton>
      </Filters>

      <ComposeBar>
        <Compose />
      </ComposeBar>

      {isLoading && <Loading>Carregando…</Loading>}

      {tweets.map((t) => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </Container>
  );
}
