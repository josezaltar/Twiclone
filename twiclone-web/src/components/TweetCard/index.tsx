// src/components/TweetCard/index.tsx
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI, Tweet } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';
import {
  Card,
  Row,
  Avatar,
  Body,
  NameRow,
  Username,
  Display,
  Text,
  Actions,
  LikeBtn,
  RtStat,
} from './style';

type Props = {
  tweet: Tweet;
  listKey?: readonly unknown[];
  disableLink?: boolean;
};

export default function TweetCard({ tweet, listKey = ['tweets'], disableLink = false }: Props) {
  const { user } = useAuthStore();
  const qc = useQueryClient();

  const like = useMutation({
    mutationFn: () => RealAPI.toggleLike(tweet.id),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: listKey });
      const prev = qc.getQueryData<Tweet[]>(listKey) || [];
      const next = prev.map(t =>
        t.id === tweet.id
          ? { ...t, liked: !t.liked, like_count: t.liked ? t.like_count - 1 : t.like_count + 1 }
          : t
      );
      qc.setQueryData(listKey, next);
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(listKey, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: listKey }),
  });

  return (
    <Card>
      <Row>
        <Avatar
          src={
            tweet.author.avatar_url ||
            `https://api.dicebear.com/7.x/identicon/svg?seed=${tweet.author.username}`
          }
          alt=""
        />
        <Body>
          <NameRow>
            <Username to={`/${tweet.author.username}`}>@{tweet.author.username}</Username>
            {tweet.author.display_name && <Display>{tweet.author.display_name}</Display>}
          </NameRow>

          {disableLink ? (
            <Text>{tweet.text}</Text>
          ) : (
            <Link to={`/status/${tweet.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text>{tweet.text}</Text>
            </Link>
          )}

          <Actions>
            <LikeBtn onClick={() => like.mutate()} aria-pressed={tweet.liked}>
              ♥ {tweet.like_count}
            </LikeBtn>
            <RtStat>↻ {tweet.retweet_count}</RtStat>
          </Actions>
        </Body>
      </Row>
    </Card>
  );
}
