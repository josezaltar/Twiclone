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
  background: #111;
  color: #fff;
  width: 520px;
  max-width: 100%;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 14px;
    color: #ddd;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #1a1a1a;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #3a8bfd;
    box-shadow: 0 0 0 3px rgba(58, 139, 253, 0.25);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #1a1a1a;
  color: #fff;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #3a8bfd;
    box-shadow: 0 0 0 3px rgba(58, 139, 253, 0.25);
  }
`;

export const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background: #1d9bf0;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: transparent;
  color: #ddd;
  border: 1px solid #2a2a2a;
`;
