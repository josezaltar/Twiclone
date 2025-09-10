// src/components/BannerUpload/index.tsx
import React, { useRef, useState } from 'react';
import { RealAPI } from '../../lib/realApi';
import { Container, StyledInput } from './style';

type Props = { onUploaded?: (url: string) => void };

export default function BannerUpload({ onUploaded }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const { url } = await RealAPI.uploadBanner(file);
      onUploaded?.(url);
    } finally {
      setLoading(false);
      if (ref.current) ref.current.value = '';
    }
  }

  return (
    <Container>
      <StyledInput
        ref={ref}
        type="file"
        accept="image/*"
        onChange={onPick}
        disabled={loading}
      />
    </Container>
  );
}