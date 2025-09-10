import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import type { Tweet } from '../../lib/realApi';

type Props = {
  tweet: Tweet;
  listKey?: (string | number)[];
  /** quando true, não abre a tela de status ao clicar no texto */
  disableLink?: boolean;
};

export default function TweetCard({ tweet, disableLink = false }: Props) {
  const nav = useNavigate();

  const author = tweet.author;
  const toProfile = `/${author.username}`;
  const toStatus = `/${author.username}/status/${tweet.id}`;

  const createdText = useMemo(() => {
    try {
      const d = new Date(String(tweet.created_at));
      return d.toLocaleString();
    } catch {
      return '';
    }
  }, [tweet.created_at]);

  return (
    <article
      style={{
        borderBottom: '1px solid #222',
        padding: '12px 16px',
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: 12,
      }}
    >
      {/* Avatar -> perfil */}
      <Link to={toProfile} style={{ display: 'block' }}>
        <img
          src={
            author.avatar_url ||
            `https://api.dicebear.com/7.x/identicon/svg?seed=${author.username}`
          }
          alt=""
          style={{ width: 48, height: 48, borderRadius: 999 }}
        />
      </Link>

      <div>
        {/* Cabeçalho: nome/handle -> perfil, data -> status */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
          <Link to={toProfile} style={{ fontWeight: 700 }}>
            {author.display_name || author.username}
          </Link>
          <Link to={toProfile} style={{ opacity: 0.7 }}>
            @{author.username}
          </Link>
          <span style={{ opacity: 0.5 }}>·</span>
          {disableLink ? (
            <span style={{ opacity: 0.6 }}>{createdText}</span>
          ) : (
            <Link to={toStatus} style={{ opacity: 0.6 }}>
              {createdText}
            </Link>
          )}
        </div>

        {/* Corpo -> status (se permitido) */}
        <div
          onClick={
            disableLink ? undefined : () => nav(toStatus)
          }
          style={{ cursor: disableLink ? 'default' : 'pointer', whiteSpace: 'pre-wrap', marginTop: 6 }}
        >
          {tweet.text}
        </div>

        {/* (ações/contadores permanecem os que você já tem, se houver) */}
      </div>
    </article>
  );
}
