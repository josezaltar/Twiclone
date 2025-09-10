import styled from 'styled-components';

export const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  background: #0e0e0e;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  padding: 6px 12px 6px 36px;

  &:focus-within {
    border-color: #1d9bf0;
    box-shadow: 0 0 0 3px rgba(29, 155, 240, 0.2);
  }
`;

export const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.9;
  user-select: none;
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e6e6e6;
  font-size: 14px;
  min-width: 0; /* evita overflow em flex containers */

  &::placeholder {
    color: #9aa0a6;
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: #242424;
  color: #e6e6e6;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  line-height: 1;
  display: grid;
  place-items: center;
  padding: 0;

  &:hover {
    background: #2b2b2b;
  }
`;
