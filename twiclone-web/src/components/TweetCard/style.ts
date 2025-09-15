// src/components/TweetCard/style.ts
import styled from 'styled-components';

export const Card = styled.article`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Head = styled.header`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 40px; height: 40px; border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.card};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Who = styled.div`
  display: flex; align-items: baseline; gap: 8px;
  cursor: pointer;

  &:hover { text-decoration: underline; text-underline-offset: 2px; }
`;

export const Name = styled.strong``;

export const Handle = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const When = styled.time`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Body = styled.p`
  margin: 8px 0 0 52px;
  white-space: pre-wrap;
`;

export const Actions = styled.div`
  margin-left: 52px;
  display: flex; gap: 16px; margin-top: 8px;
`;

export const ActionBtn = styled.button`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &[aria-pressed='true'] {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;
