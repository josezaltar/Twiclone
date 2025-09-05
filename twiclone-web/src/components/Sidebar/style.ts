// src/components/Sidebar/style.ts
import styled from 'styled-components';

export const Wrapper = styled.aside`
  display: grid;
  gap: 12px;
`;

export const Row = styled.div`
  display: grid;
`;

export const ThemeBtn = styled.button`
  padding: 10px 14px;
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

export const UserBox = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.card};
`;

export const Avatar = styled.img`
  width: 40px; height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.input};
`;

export const Info = styled.div`
  display: grid;
  line-height: 1.1;
`;

export const Name = styled.div`
  font-weight: 800;
`;

export const Handle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;
