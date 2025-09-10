import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #000;
  color: #fff;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Side = styled.aside`
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  padding: 24px 16px;
  border-right: 1px solid #1f1f1f;
  background: #0b0b0b;

  @media (max-width: 900px) {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #1f1f1f;
  }
`;

export const Brand = styled.div`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.2px;
  margin-bottom: 20px;
`;

export const Nav = styled.nav`
  display: grid;
  gap: 8px;
`;

export const NavItem = styled(NavLink).attrs({ className: 'nav-item' })`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  text-decoration: none;
  color: #ddd;
  font-weight: 600;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #161616;
    color: #fff;
  }

  &.active {
    background: #1d9bf0;
    color: #fff;
  }
`;

export const LogoutBtn = styled.button`
  margin-top: 8px;
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  background: transparent;
  color: #ddd;
  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background: #161616;
    color: #fff;
  }
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 24px 16px;
  display: block;

  /* largura de timeline confortável */
  max-width: 760px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;
