// src/components/Layout/style.ts
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/** Grid principal */
export const Shell = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  column-gap: 0; /* sem espaço entre sidebar e feed */
  min-height: 100vh;
`;

/** Sidebar */
export const Aside = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  padding: 12px 12px;
`;

export const Brand = styled.div`
  font-size: 28px;
  font-weight: 800;
  padding: 8px 6px 14px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0 16px;
`;

export const NavItem = styled(NavLink)`
  display: block;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  &.active {
    background: ${({ theme }) => theme.colors.hover};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.card};
  margin-top: auto;
`;

export const LogoutBtn = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

/** Área principal (feed) */
export const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding-left: 0;
  margin-left: 0;
`;

/* ---- ALIAS para compatibilidade com Layout/index.tsx antigo ---- */
/* Seu Layout importava Wrapper e Side. Mantemos esses nomes também. */
export { Shell as Wrapper, Aside as Side };
