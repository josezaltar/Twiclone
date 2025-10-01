// src/components/Sidebar/index.tsx
import { useState } from 'react';
import { useAuth } from '../../store/auth';
import { useUIStore } from '../../store/ui';
import EditProfileModal from '../EditProfileModal';
import ChangePasswordModal from '../ChangePasswordModal';
import {
  Wrapper,
  Row,
  ThemeBtn,
  UserBox,
  Avatar,
  Info,
  Name,
  Handle,
  ActionBtn,
} from './style';

export default function Sidebar() {
  const { user } = useAuth();
  const themeMode = useUIStore((s) => s.themeMode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <Wrapper>
      <Row>
        <ThemeBtn type="button" onClick={toggleTheme}>
          {themeMode === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
        </ThemeBtn>
      </Row>

      {user && (
        <>
          <UserBox>
            <Avatar
              src={
                user.avatar_url ||
                `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
              }
              alt=""
            />
            <Info>
              <Name>{user.display_name || user.username}</Name>
              <Handle>@{user.username}</Handle>
            </Info>
          </UserBox>

          <Row style={{ flexDirection: 'column', gap: '8px' }}>
            <ActionBtn type="button" onClick={() => setShowEditModal(true)}>
              ✏️ Editar perfil
            </ActionBtn>
            <ActionBtn type="button" onClick={() => setShowPasswordModal(true)}>
              🔒 Alterar senha
            </ActionBtn>
          </Row>
        </>
      )}

      {showEditModal && user && (
        <EditProfileModal
          initial={{
            display_name: user.display_name || '',
            bio: user.bio || '',
            location: user.location || '',
            website: user.website || '',
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </Wrapper>
  );
}