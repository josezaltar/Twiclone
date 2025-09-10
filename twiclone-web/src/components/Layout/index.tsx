import React, { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import {
  Wrapper,
  Side,
  Brand,
  Nav,
  NavItem,
  LogoutBtn,
  Main,
} from './style';

type Props = { children?: ReactNode };

export default function Layout({ children }: Props) {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const nav = useNavigate();

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
            <LogoutBtn type="button" onClick={handleLogout}>
              Sair
            </LogoutBtn>
          )}
        </Nav>
      </Side>

      <Main>{children ?? <Outlet />}</Main>
    </Wrapper>
  );
}
