import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import type { User } from '../../types/user';
import { useAuth } from '../../store/auth';
import {
  Backdrop,
  Modal,
  Title,
  FormGrid,
  Field,
  Input,
  TextArea,
  Actions,
  Button,
  ButtonSecondary,
} from './style';

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

  const setUser = useAuth((s) => s.setUser);
  const qc = useQueryClient();

  const m = useMutation<User, Error, void>({
    mutationFn: async () =>
      RealAPI.updateMyProfile({
        display_name: display.trim(),
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim(),
      }),
    onSuccess: (updated) => {
      // Atualiza estado global do usuário logado
      setUser(updated);

      // Invalida caches comuns onde o perfil pode aparecer
      qc.invalidateQueries({ queryKey: ['profile'] });
      qc.invalidateQueries({ queryKey: ['profile', updated.username] });
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });

      onClose();
    },
  });

  return (
    <Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Editar perfil</Title>

        <FormGrid>
          <Field>
            <label htmlFor="display_name">Nome de exibição</label>
            <Input
              id="display_name"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              placeholder="Seu nome público"
              autoFocus
            />
          </Field>

          <Field>
            <label htmlFor="bio">Bio</label>
            <TextArea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Fale um pouco sobre você"
            />
          </Field>

          <Field>
            <label htmlFor="location">Localização</label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Cidade, País"
            />
          </Field>

          <Field>
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://seusite.com"
            />
          </Field>
        </FormGrid>

        <Actions>
          <ButtonSecondary onClick={onClose} disabled={m.isPending}>
            Cancelar
          </ButtonSecondary>
          <Button onClick={() => m.mutate()} disabled={m.isPending}>
            {m.isPending ? 'Salvando…' : 'Salvar'}
          </Button>
        </Actions>
      </Modal>
    </Backdrop>
  );
}
