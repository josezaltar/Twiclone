// src/components/ChangePasswordModal/style.ts
import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  width: 480px;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 10px 20px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ErrorMsg = styled.div`
  background: #ef44441a;
  color: #ef4444;
  border: 1px solid #ef444466;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-top: 12px;
  font-size: 14px;
`;

export const SuccessMsg = styled.div`
  background: #10b9811a;
  color: #10b981;
  border: 1px solid #10b98166;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-top: 12px;
  font-size: 14px;
`;