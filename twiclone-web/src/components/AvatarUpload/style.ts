// src/components/AvatarUpload/style.ts
import styled from 'styled-components';

export const Inline = styled.div`
  display: grid;
  gap: 6px;
  align-items: center;
`;

export const UploadBtn = styled.button<{ $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $compact }) => ($compact ? '6px 10px' : '10px 14px')};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  border: none;
  cursor: pointer;
  font-weight: 700;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Hint = styled.div<{ $compact?: boolean }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  display: ${({ $compact }) => ($compact ? 'none' : 'block')};
`;

export const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
`;
