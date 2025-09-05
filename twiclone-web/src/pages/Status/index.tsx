import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RealAPI as FakeAPI, Tweet } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';
import TweetCard from '../../components/TweetCard';

export default function Status() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const { data: all = [] } = useQuery<Tweet[]>({
    queryKey: ['tweets', user?.id],
    queryFn: () => FakeAPI.listTweets(),
  });

  const main = useMemo(
    () => all.find((t) => String(t.id) === String(id)),
    [all, id]
  );

  if (!main) return <div style={{ padding: 16 }}>Tweet não encontrado</div>;

  return (
    <div>
      <TweetCard tweet={main} disableLink listKey={['tweets', user?.id]} />
    </div>
  );
}
