import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import type { User } from '../../types/user';
import { useAuth } from '../../store/auth';
import {
  Backdrop,
  Modal,
  Title,
  BannerSection,
  BannerPreview,
  AvatarSection,
  AvatarPreview,
  UploadBtn,
  HiddenFile,
  FormGrid,
  Field,
  Input,
  TextArea,
  Actions,
  Button,
  ButtonSecondary,
} from './style';

type Initial = {
  userId?: number;
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

  const user = useAuth((s) => s.user);
  const setUser = useAuth((s) => s.setUser);
  const qc = useQueryClient();

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || '');
  const [bannerPreview, setBannerPreview] = useState(user?.banner_url || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const m = useMutation<User, Error, void>({
    mutationFn: async () => {
      // Upload avatar se houver
      if (avatarFile) {
        await RealAPI.uploadAvatar(avatarFile);
      }

      // Upload banner se houver
      if (bannerFile) {
        await RealAPI.uploadBanner(bannerFile);
      }

      // Atualiza perfil
      return RealAPI.updateMyProfile({
        display_name: display.trim(),
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim(),
      });
    },
    onSuccess: (updated) => {
      setUser(updated);
      qc.invalidateQueries({ queryKey: ['profile'] });
      qc.invalidateQueries({ queryKey: ['profile', updated.username] });
      qc.invalidateQueries({ queryKey: ['auth', 'me'] });
      onClose();
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Backdrop role="dialog" aria-modal="true" onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Editar perfil</Title>

        <BannerSection>
          <BannerPreview $src={bannerPreview}>
            <HiddenFile id="banner-upload" accept="image/*" onChange={handleBannerChange} />
            <UploadBtn as="label" htmlFor="banner-upload">
              Trocar capa
            </UploadBtn>
          </BannerPreview>
        </BannerSection>

        <AvatarSection>
          <AvatarPreview
            src={
              avatarPreview ||
              `https://api.dicebear.com/7.x/identicon/svg?seed=${user?.username}`
            }
            alt=""
          />
          <HiddenFile id="avatar-upload" accept="image/*" onChange={handleAvatarChange} />
          <UploadBtn as="label" htmlFor="avatar-upload">
            Trocar foto
          </UploadBtn>
        </AvatarSection>

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