import styled from 'styled-components';

export const HeaderBar = styled.div`
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 16px;
  z-index: 6;
  font-size: 18px;
  font-weight: 700;
`;

export const Divider = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
