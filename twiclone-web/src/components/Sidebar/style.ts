// src/components/Sidebar/style.ts
import styled from 'styled-components';

export const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ThemeBtn = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: transparent;
  color: inherit;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  color: inherit;
`;

export const Handle = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.2;
  word-break: break-all;
`;
