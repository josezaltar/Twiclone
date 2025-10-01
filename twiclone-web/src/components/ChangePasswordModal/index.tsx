// src/components/ChangePasswordModal/index.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import {
  Backdrop,
  Modal,
  Title,
  FormGrid,
  Field,
  Input,
  Actions,
  Button,
  ButtonSecondary,
  ErrorMsg,
  SuccessMsg,
} from './style';

type Props = {
  onClose: () => void;
};

export default function ChangePasswordModal({ onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () => RealAPI.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (err: any) => {
      setError(err?.response?.data?.detail || 'Erro ao alterar senha.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    mutation.mutate();
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Alterar senha</Title>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <label htmlFor="current">Senha atual</label>
              <Input
                id="current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                disabled={mutation.isPending || success}
              />
            </Field>

            <Field>
              <label htmlFor="new">Nova senha</label>
              <Input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                disabled={mutation.isPending || success}
              />
            </Field>

            <Field>
              <label htmlFor="confirm">Confirme a nova senha</label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={mutation.isPending || success}
              />
            </Field>
          </FormGrid>

          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <SuccessMsg>Senha alterada com sucesso!</SuccessMsg>}

          <Actions>
            <ButtonSecondary type="button" onClick={onClose} disabled={mutation.isPending}>
              Cancelar
            </ButtonSecondary>
            <Button type="submit" disabled={mutation.isPending || success}>
              {mutation.isPending ? 'Alterando...' : 'Alterar senha'}
            </Button>
          </Actions>
        </form>
      </Modal>
    </Backdrop>
  );
}