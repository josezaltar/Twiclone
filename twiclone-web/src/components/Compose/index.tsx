import React, { useState, KeyboardEvent } from 'react';
import { RealAPI } from '../../lib/realApi';
import { Form, TextArea, Actions, SubmitBtn } from './style';

type Props = {
  onCreated?: () => void;
};

export default function Compose({ onCreated }: Props) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const canSend = !!text.trim() && !loading;

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const body = text.trim();
    if (!body) return;

    setLoading(true);
    try {
      await RealAPI.createTweet(body);
      setText('');
      onCreated?.();
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Atalho: Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && canSend) {
      submit();
    }
  }

  return (
    <Form onSubmit={submit} role="form" aria-label="Compor tweet">
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        placeholder="O que está acontecendo?"
      />
      <Actions>
        <SubmitBtn type="submit" disabled={!canSend}>
          {loading ? 'Enviando…' : 'Tweetar'}
        </SubmitBtn>
      </Actions>
    </Form>
  );
}
