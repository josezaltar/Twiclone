import styled from 'styled-components';

export const Main = styled.main`
  padding: 12px;
`;

export const Title = styled.h2`
  margin: 0 0 12px 0;
`;

export const Loading = styled.div`
  padding: 12px;
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  color: red;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const UserName = styled.div`
  font-weight: 600;
`;

export const FollowButtonWrapper = styled.div`
  margin-left: auto;
`;
