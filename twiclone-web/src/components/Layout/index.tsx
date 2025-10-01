import React, { ReactNode, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import EditProfileModal from '../EditProfileModal';
import ChangePasswordModal from '../ChangePasswordModal';
import {
  Wrapper,
  Side,
  Brand,
  Nav,
  NavItem,
  ActionBtn,
  LogoutBtn,
  Main,
} from './style';

type Props = { children?: ReactNode };

export default function Layout({ children }: Props) {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const nav = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <Wrapper>
      <Side>
        <Brand>Twiclone</Brand>

        <Nav>
          <NavItem to="/" end>
            Início
          </NavItem>

          <NavItem to={`/${user?.username ?? 'demo'}`}>
            Perfil
          </NavItem>

          <NavItem to="/followers">
            Seguidores
          </NavItem>

          <NavItem to="/following">
            Seguindo
          </NavItem>

          {!user && (
            <NavItem to="/login">
              Login
            </NavItem>
          )}

          {user && (
            <>
              <ActionBtn type="button" onClick={() => setShowEditModal(true)}>
                Editar perfil
              </ActionBtn>

              <ActionBtn type="button" onClick={() => setShowPasswordModal(true)}>
                Alterar senha
              </ActionBtn>

              <LogoutBtn type="button" onClick={handleLogout}>
                Sair
              </LogoutBtn>
            </>
          )}
        </Nav>
      </Side>

      <Main>{children ?? <Outlet />}</Main>

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