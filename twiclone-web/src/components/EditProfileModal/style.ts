import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 49;
`;

export const Card = styled.form`
  position: fixed;
  z-index: 50;
  inset: 0;
  margin: auto;
  width: min(600px, 92vw);
  max-height: 90vh;
  overflow: auto;
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 18px;
`;

export const CloseX = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: 0;
  color: #aaa;
  font-size: 22px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
`;

export const Row = styled.div`
  display: grid;
  gap: 6px;
  margin: 10px 0 14px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #d1d5db;
`;

export const Field = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 12px;
  outline: none;
  font: inherit;
  &:focus {
    background: rgba(255, 255, 255, 0.07);
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 6px;
`;

export const Button = styled.button<{ $ghost?: boolean }>`
  background: ${({ $ghost, theme }) => ($ghost ? 'transparent' : theme.colors.primary)};
  color: ${({ $ghost }) => ($ghost ? '#fff' : '#000')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
