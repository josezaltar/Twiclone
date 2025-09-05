// src/components/BannerUpload/index.tsx
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';
import { Btn, ErrorMsg } from './style';

type Props = {
  className?: string;
  buttonText?: string;
};

export default function BannerUpload({ className, buttonText = 'Trocar capa' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuthStore();

  const { mutateAsync, isPending, error } = useMutation<string, Error, File>({
    mutationFn: file => RealAPI.updateUserBanner(file),
    onSuccess: url => {
      if (user) setUser({ ...user, banner_url: url });
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
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <Btn onClick={pickFile} disabled={isPending}>
        {isPending ? 'Enviando…' : buttonText}
      </Btn>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
    </div>
  );
}
