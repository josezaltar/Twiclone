// src/components/TweetCard/index.tsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI, Tweet } from '../../lib/realApi';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Head,
  Avatar,
  Who,
  Name,
  Handle,
  When,
  Body,
  Actions,
  ActionBtn,
  Count,
} from './style';

type Props = {
  tweet: Tweet;
  listKey?: readonly unknown[]; // opcional, para invalidar a lista correta
  disableLink?: boolean;
};

export default function TweetCard({ tweet, listKey, disableLink }: Props) {
  const nav = useNavigate();
  const qc = useQueryClient();

  const [liked, setLiked] = useState(!!tweet.liked);
  const [likeCount, setLikeCount] = useState<number>(tweet.like_count ?? 0);
  const [retweeted, setRetweeted] = useState(!!tweet.retweeted);
  const [retweetCount, setRetweetCount] = useState<number>(tweet.retweet_count ?? 0);

  const likeMut = useMutation({
    mutationFn: () => RealAPI.toggleLike(tweet.id),
    onSuccess: (res) => {
      if (typeof res.like_count === 'number') setLikeCount(res.like_count);
      if (typeof res.liked === 'boolean') setLiked(res.liked);
      qc.invalidateQueries({ queryKey: listKey ?? ['tweets'] });
    },
  });

  const rtMut = useMutation({
    mutationFn: () => RealAPI.toggleRetweet(tweet.id),
    onSuccess: (res) => {
      if (typeof res.retweet_count === 'number') setRetweetCount(res.retweet_count);
      if (typeof res.retweeted === 'boolean') setRetweeted(res.retweeted);
      qc.invalidateQueries({ queryKey: listKey ?? ['tweets'] });
    },
  });

  const goProfile = () => {
    if (disableLink) return;
    nav(`/${tweet.author.username}`);
  };

  return (
    <Card>
      <Head>
        <Avatar
          src={
            tweet.author.avatar_url ||
            `https://api.dicebear.com/7.x/identicon/svg?seed=${tweet.author.username}`
          }
          alt=""
          onClick={goProfile}
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${tweet.author.username}`;
          }}
        />
        <Who onClick={goProfile}>
          <Name>{tweet.author.display_name || tweet.author.username}</Name>
          <Handle>@{tweet.author.username}</Handle>
          <When>· {new Date(tweet.created_at).toLocaleString()}</When>
        </Who>
      </Head>

      <Body>{tweet.text}</Body>

      <Actions>
        <ActionBtn
          aria-pressed={liked}
          disabled={likeMut.isPending}
          onClick={() => likeMut.mutate()}
          title={liked ? 'Remover curtida' : 'Curtir'}
        >
          ❤️ <Count>{likeCount}</Count>
        </ActionBtn>

        <ActionBtn
          aria-pressed={retweeted}
          disabled={rtMut.isPending}
          onClick={() => rtMut.mutate()}
          title={retweeted ? 'Remover retweet' : 'Retweetar'}
        >
          🔁 <Count>{retweetCount}</Count>
        </ActionBtn>
      </Actions>
    </Card>
  );
}
