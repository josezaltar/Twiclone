import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: block;
  flex-shrink: 0;
  opacity: 1;
`;

export const Box = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  font: inherit;
  line-height: 1.35;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.07);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const Footer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Counter = styled.span<{ $warn?: boolean }>`
  margin-right: auto;
  color: ${({ $warn }) => ($warn ? '#fca5a5' : '#9ca3af')};
  font-size: 12px;
`;

export const PublishBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #000;
  border: 0;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
