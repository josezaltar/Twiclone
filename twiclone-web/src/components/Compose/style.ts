import styled from 'styled-components';

export const Form = styled.form`
  padding: 12px;
  border-bottom: 1px solid #1f1f1f;
  background: #0b0b0b;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 64px;
  resize: vertical;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #0e0e0e;
  color: #e6e6e6;
  outline: none;

  &:focus {
    border-color: #1d9bf0;
    box-shadow: 0 0 0 3px rgba(29, 155, 240, 0.2);
  }
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
`;

export const SubmitBtn = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  background: #1d9bf0;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
