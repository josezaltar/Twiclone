// src/components/AvatarUpload/index.tsx
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';
import { Inline, UploadBtn, Hint, ErrorMsg } from './style';

type Props = {
  className?: string;
  buttonText?: string;
  compact?: boolean;
  // compat antigos (ignorados pelo backend)
  userId?: number;
  currentUrl?: string | null;
};

export default function AvatarUpload({ className, buttonText = 'Trocar foto', compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuthStore();

  const { mutateAsync, isPending, error } = useMutation<string, Error, File>({
    mutationFn: file => RealAPI.updateUserAvatar(file),
    onSuccess: url => {
      if (user) setUser({ ...user, avatar_url: url });
    },
  });

  function pickFile() {
    inputRef.current?.click();
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await mutateAsync(file);
    e.currentTarget.value = '';
  }

  return (
    <Inline className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <UploadBtn onClick={pickFile} disabled={isPending} $compact={compact}>
        {isPending ? 'Enviando…' : buttonText}
      </UploadBtn>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
      <Hint $compact={compact}>PNG, JPG ou GIF</Hint>
    </Inline>
  );
}
