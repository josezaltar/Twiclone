// src/pages/Feed/style.ts
import styled from 'styled-components';

export const Main = styled.main`
  /* Estilos para o container principal da página. */
`;

export const Title = styled.h2`
  padding: 12px;
  margin: 0;
`;

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  color: ${({ $active, theme }) => 
    $active ? theme.colors.text : theme.colors.muted};
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  cursor: pointer;
  border-bottom: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const Loading = styled.div`
  padding: 12px;
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  color: red;
`;