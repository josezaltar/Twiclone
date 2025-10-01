// src/components/TweetCard/index.tsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI, Tweet } from '../../lib/realApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import MiniTweetCard from '../MiniTweetCard';
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
  FollowBtn,
  ReplySection,
  ReplyInput,
  ReplyButton,
  RepliesList,
} from './style';

type Props = {
  tweet: Tweet;
  listKey?: readonly unknown[];
  disableLink?: boolean;
};

export default function TweetCard({ tweet, listKey, disableLink }: Props) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const { user } = useAuth();

  const [liked, setLiked] = useState(!!tweet.liked);
  const [likeCount, setLikeCount] = useState<number>(tweet.like_count ?? 0);
  const [retweeted, setRetweeted] = useState(!!tweet.retweeted);
  const [retweetCount, setRetweetCount] = useState<number>(tweet.retweet_count ?? 0);
  const [replyCount, setReplyCount] = useState<number>(tweet.reply_count ?? 0);
  const [following, setFollowing] = useState(!!tweet.is_following);
  
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<Tweet[]>([]);

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

  const followMut = useMutation({
    mutationFn: () => RealAPI.toggleFollowByHandle(tweet.author.username),
    onSuccess: (res) => {
      setFollowing(res.following);
      qc.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const replyMut = useMutation({
    mutationFn: (text: string) => RealAPI.createReply(tweet.id, text),
    onSuccess: (newReply) => {
      setReplies([newReply, ...replies]);
      setReplyText('');
      setReplyCount(replyCount + 1);
      qc.invalidateQueries({ queryKey: listKey ?? ['tweets'] });
    },
  });

  const loadReplies = async () => {
    if (!showReplies) {
      const data = await RealAPI.getTweetReplies(tweet.id);
      setReplies(data);
    }
    setShowReplies(!showReplies);
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    const text = replyText.trim();
    if (!text) return;
    replyMut.mutate(text);
  };

  const goProfile = () => {
    if (disableLink) return;
    nav(`/${tweet.author.username}`);
  };

  const isMyTweet = user?.username === tweet.author.username;

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
        
        {!isMyTweet && (
          <FollowBtn
            $following={following}
            onClick={() => followMut.mutate()}
            disabled={followMut.isPending}
          >
            {following ? 'Seguindo' : 'Seguir'}
          </FollowBtn>
        )}
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

        <ActionBtn
          onClick={loadReplies}
          title="Ver comentários"
        >
          💬 <Count>{replyCount}</Count>
        </ActionBtn>
      </Actions>

      {showReplies && (
        <>
          <ReplySection onSubmit={handleReply}>
            <ReplyInput
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Escreva um comentário..."
            />
            <ReplyButton type="submit" disabled={!replyText.trim() || replyMut.isPending}>
              {replyMut.isPending ? 'Enviando...' : 'Comentar'}
            </ReplyButton>
          </ReplySection>

          <RepliesList>
            {replies.map((reply) => (
              <MiniTweetCard 
                key={reply.id} 
                tweet={reply}
                onUpdated={loadReplies}
                level={1}
              />
            ))}
          </RepliesList>
        </>
      )}
    </Card>
  );
}