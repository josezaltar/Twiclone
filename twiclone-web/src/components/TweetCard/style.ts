// src/components/TweetCard/style.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.input};
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NameRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: baseline;
`;

export const Username = styled(Link)`
  font-weight: 800;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Display = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Text = styled.p`
  white-space: pre-wrap;
  margin: 6px 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  align-items: center;
`;

export const LikeBtn = styled.button`
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;

  &[aria-pressed='true'] {
    color: #ef4444;
    font-weight: 700;
  }
`;

export const RtStat = styled.span``;
