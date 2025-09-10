// src/components/TweetCard/index.tsx
import React, { useState } from 'react';
import { RealAPI } from '../../lib/realApi';
import type { Tweet } from '../../types/tweet';
import { Article, Author, Text, Actions, Button } from './style';

type Props = {
  tweet: Tweet;
};

export default function TweetCard({ tweet }: Props) {
  const [likeCount, setLikeCount] = useState(tweet.like_count);
  const [retweetCount, setRetweetCount] = useState(tweet.retweet_count);

  async function toggleLike() {
    const res = await RealAPI.toggleLike(tweet.id);
    setLikeCount(res.like_count);
  }

  async function toggleRetweet() {
    const res = await RealAPI.toggleRetweet(tweet.id);
    setRetweetCount(res.retweet_count);
  }

  return (
    <Article>
      <Author>
        {tweet.author.display_name} @{tweet.author.username}
      </Author>
      <Text>{tweet.text}</Text>
      <Actions>
        <Button onClick={toggleLike}>❤ {likeCount}</Button>
        <Button onClick={toggleRetweet}>🔁 {retweetCount}</Button>
      </Actions>
    </Article>
  );
}