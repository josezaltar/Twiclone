import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI as FakeAPI } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';

export default function Compose() {
  const qc = useQueryClient();
  const { user } = useAuthStore();
  const [text, setText] = useState('');

  const m = useMutation({
    mutationFn: () => FakeAPI.createTweet(text.trim()),
    onSuccess: () => {
      setText('');
      qc.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  if (!user) return null;

  return (
    <div style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <img
          src={
            user.avatar_url ||
            `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username || 'anon'}`
          }
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
        <div style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="O que está acontecendo?"
            maxLength={280}
            style={{ width: '100%', minHeight: 70, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button
              onClick={() => m.mutate()}
              disabled={m.isPending || !text.trim()}
            >
              {m.isPending ? 'Enviando…' : 'Twittar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
