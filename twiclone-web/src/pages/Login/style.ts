// src/pages/Login/style.ts
import styled from 'styled-components';

export const Wrap = styled.div`
  max-width: 760px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 20px;
`;

export const Title = styled.h2`
  margin: 0 0 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  label {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
  }
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 12px;
  outline: none;
  width: 100%;
  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  color: #ef4444;
  margin: 8px 0;
  font-weight: 600;
`;
