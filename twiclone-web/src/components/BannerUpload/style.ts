// src/components/BannerUpload/style.ts
import styled from 'styled-components';

export const Btn = styled.button`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
  font-weight: 600;
`;
