// src/components/FollowButton/style.ts
import styled, { css } from 'styled-components';

export const Btn = styled.button<{
  $size?: 'sm' | 'md';
  $active?: boolean;
}>`
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform .02s ease-in-out, background .15s ease;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          padding: 6px 10px;
          font-size: 13px;
        `
      : css`
          padding: 8px 14px;
          font-size: 14px;
        `}

  ${({ $active, theme }) =>
    $active
      ? css`
          background: transparent;
          color: ${theme.colors.text};
          &:hover {
            background: ${theme.colors.hover};
          }
        `
      : css`
          background: ${theme.colors.primary};
          color: ${theme.colors.primaryText};
          &:hover {
            filter: brightness(0.95);
          }
        `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;
