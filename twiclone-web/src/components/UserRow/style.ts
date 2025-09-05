// src/components/UserRow/style.ts
import styled from 'styled-components';

export const Row = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Left = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 40px; height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.input};
`;

export const Info = styled.div`
  display: grid;
`;

export const Name = styled.div`
  font-weight: 700;
`;

export const Handle = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
`;
