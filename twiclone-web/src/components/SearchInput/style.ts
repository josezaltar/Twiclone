// src/components/SearchInput/style.ts
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 8px 12px;
`;

export const Icon = styled.span`
  opacity: 0.8;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
`;
