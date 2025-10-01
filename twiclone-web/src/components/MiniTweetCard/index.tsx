// src/components/MiniTweetCard/index.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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
  ReplySection,
  ReplyInput,
  ReplyButton,
} from './style';

type Props = {
  tweet: Tweet;
  onUpdated?: () => void;
  level?: number; // Controla a profundidade da recursão
};

export default function MiniTweetCard({ tweet, onUpdated, level = 0 }: Props) {
  const nav = useNavigate();
  const maxLevel = 3; // Limita a 3 níveis de aninhamento

  const [liked, setLiked] = useState(!!tweet.liked);
  const [likeCount, setLikeCount] = useState<number>(tweet.like_count ?? 0);
  const [retweeted, setRetweeted] = useState(!!tweet.retweeted);
  const [retweetCount, setRetweetCount] = useState<number>(tweet.retweet_count ?? 0);
  const [replyCount, setReplyCount] = useState<number>(tweet.reply_count ?? 0);

  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<Tweet[]>([]);

  const likeMut = useMutation({
    mutationFn: () => RealAPI.toggleLike(tweet.id),
    onSuccess: (res) => {
      if (typeof res.like_count === 'number') setLikeCount(res.like_count);
      if (typeof res.liked === 'boolean') setLiked(res.liked);
      onUpdated?.();
    },
  });

  const rtMut = useMutation({
    mutationFn: () => RealAPI.toggleRetweet(tweet.id),
    onSuccess: (res) => {
      if (typeof res.retweet_count === 'number') setRetweetCount(res.retweet_count);
      if (typeof res.retweeted === 'boolean') setRetweeted(res.retweeted);
      onUpdated?.();
    },
  });

  const replyMut = useMutation({
    mutationFn: (text: string) => RealAPI.createReply(tweet.id, text),
    onSuccess: (newReply) => {
      setReplies([newReply, ...replies]);
      setReplyText('');
      setReplyCount(replyCount + 1);
      onUpdated?.();
    },
  });

  const loadReplies = async () => {
    if (!showReplies && level < maxLevel) {
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
    nav(`/${tweet.author.username}`);
  };

  return (
    <>
      <Card>
        <Head>
          <Avatar
            src={
              tweet.author.avatar_url ||
              `https://api.dicebear.com/7.x/identicon/svg?seed=${tweet.author.username}`
            }
            alt=""
            onClick={goProfile}
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

          {level < maxLevel && (
            <ActionBtn onClick={loadReplies} title="Ver respostas">
              💬 <Count>{replyCount}</Count>
            </ActionBtn>
          )}
        </Actions>

        {showReplies && level < maxLevel && (
          <>
            <ReplySection onSubmit={handleReply}>
              <ReplyInput
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Responder..."
              />
              <ReplyButton type="submit" disabled={!replyText.trim() || replyMut.isPending}>
                {replyMut.isPending ? '...' : 'Responder'}
              </ReplyButton>
            </ReplySection>

            {replies.map((reply) => (
              <div key={reply.id} style={{ marginLeft: '20px' }}>
                <MiniTweetCard 
                  tweet={reply} 
                  onUpdated={loadReplies} 
                  level={level + 1}
                />
              </div>
            ))}
          </>
        )}
      </Card>
    </>
  );
}