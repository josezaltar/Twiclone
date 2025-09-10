// src/pages/Login/style.ts
import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  gap: 24px;
  max-width: 960px;
  margin: 40px auto;
  padding: 0 16px;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Title = styled.h2`
  margin: 0 0 16px 0;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 12px;

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme.colors.primary}33;
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  border: 0;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ErrorMsg = styled.div`
  background: #ef44441a;
  color: #ef4444;
  border: 1px solid #ef444466;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin: 8px 0 12px 0;
`;
