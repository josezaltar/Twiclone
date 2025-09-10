// src/pages/Status/index.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RealAPI, type Tweet } from '../../lib/realApi';
import { useAuth } from '../../store/auth';
import TweetCard from '../../components/TweetCard';
import { Wrap } from './style';

export default function Status() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  // Hooks sempre no topo — nada de returns antes deles
  const {
    data: all = [],
    isLoading,
    isError,
  } = useQuery<Tweet[]>({
    queryKey: ['tweets', user?.id],
    queryFn: () => RealAPI.listTweets(),
    staleTime: 30_000,
  });

  const main = useMemo(() => {
    const target = (id ?? '').toString();
    return all.find((t) => String(t.id) === target);
  }, [all, id]);

  if (!id) return <Wrap>URL inválida: id do tweet ausente.</Wrap>;
  if (isLoading) return <Wrap>Carregando…</Wrap>;
  if (isError) return <Wrap>Não foi possível carregar o tweet.</Wrap>;
  if (!main) return <Wrap>Tweet não encontrado.</Wrap>;

  return (
    <Wrap>
      <TweetCard tweet={main} />
    </Wrap>
  );
}
