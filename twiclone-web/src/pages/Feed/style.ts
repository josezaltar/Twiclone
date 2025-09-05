// src/pages/Feed/style.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 720px;
  /* antes: margin: 0 auto; -> centralizava e gerava “vão” */
  margin: 0;            /* encosta no limite esquerdo do Main */
`;

export const Filters = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  gap: 8px;
  /* antes: padding: 8px 12px; */
  padding: 8px 12px 8px 0;  /* sem padding à esquerda */
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  backdrop-filter: blur(6px);
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryText : theme.colors.text};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.hover};
  }
`;

export const ComposeBar = styled.div`
  position: sticky;
  top: 48px; /* abaixo dos filtros */
  z-index: 4;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  backdrop-filter: blur(6px);
  /* sem padding esquerdo extra */
`;

export const Loading = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.colors.muted};
`;
