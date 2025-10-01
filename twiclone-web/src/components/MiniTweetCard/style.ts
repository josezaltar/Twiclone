// src/components/MiniTweetCard/style.ts
import styled from 'styled-components';

export const Card = styled.article`
  padding: 12px;
  margin-left: 20px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  margin-top: 8px;
`;

export const Head = styled.header`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.card};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Who = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Name = styled.strong`
  font-size: 14px;
`;

export const Handle = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

export const When = styled.time`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

export const Body = styled.p`
  margin: 8px 0 0 42px;
  white-space: pre-wrap;
  font-size: 14px;
`;

export const Actions = styled.div`
  margin-left: 42px;
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 13px;

  &[aria-pressed='true'] {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const ReplySection = styled.form`
  margin: 12px 0 0 42px;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ReplyInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ReplyButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;