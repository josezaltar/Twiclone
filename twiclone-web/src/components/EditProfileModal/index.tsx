import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI as FakeAPI, User } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';

type Initial = {
  userId?: number; // mantido por compatibilidade, não é usado no backend
  display_name: string;
  bio: string;
  location: string;
  website: string;
};

type Props = {
  initial: Initial;
  onClose: () => void;
};

export default function EditProfileModal({ initial, onClose }: Props) {
  const [display, setDisplay] = useState(initial.display_name || '');
  const [bio, setBio] = useState(initial.bio || '');
  const [location, setLocation] = useState(initial.location || '');
  const [website, setWebsite] = useState(initial.website || '');

  const { setUser } = useAuthStore();
  const qc = useQueryClient();

  const m = useMutation<User, Error, void>({
    mutationFn: async () =>
      await FakeAPI.updateProfile({
        display_name: display.trim(),
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim(),
      }),
    onSuccess: (updated) => {
      setUser(updated);
      qc.invalidateQueries({ queryKey: ['profile'] });
      onClose();
    },
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div style={{ background: '#111', padding: 16, borderRadius: 8, width: 520, maxWidth: '100%' }}>
        <h3 style={{ marginTop: 0 }}>Editar perfil</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            Nome de exibição
            <input value={display} onChange={(e) => setDisplay(e.target.value)} />
          </label>
          <label>
            Bio
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <label>
            Localização
            <input value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <label>
            Website
            <input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} disabled={m.isPending}>Cancelar</button>
          <button onClick={() => m.mutate()} disabled={m.isPending}>
            {m.isPending ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
