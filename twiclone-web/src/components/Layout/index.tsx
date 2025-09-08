// src/components/Layout/index.tsx
import { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Wrapper, Side, Nav, NavItem, Main, Brand, LogoutBtn } from './style';

type Props = { children?: ReactNode };

export default function Layout({ children }: Props) {
  const { user, logout } = useAuthStore();
  const nav = useNavigate();

  return (
    <Wrapper>
      <Side>
        <Brand>Twiclone</Brand>
        <Nav>
          <NavItem to="/" end>Início</NavItem>
          <NavItem to={`/${user?.username ?? 'demo'}`}>Perfil</NavItem>
          <NavItem to="/followers">Seguidores</NavItem>
          <NavItem to="/following">Seguindo</NavItem>
          <NavItem to="/login">login</NavItem>

          {user && (
            <LogoutBtn
              type="button"
              onClick={() => {
                logout();
                nav('/login');
              }}
            >
              Sair
            </LogoutBtn>
          )}
        </Nav>
      </Side>

      <Main>{children ?? <Outlet />}</Main>
    </Wrapper>
  );
}
