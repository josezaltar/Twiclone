import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.h2`
  padding: 16px;
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 800;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;
