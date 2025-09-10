// src/pages/Followers/style.ts
import styled from 'styled-components';

export const Main = styled.main`
  padding: 12px;
`;

export const Title = styled.h2`
  /* Estilos para o título da página, se precisar de mais. */
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
`;

export const ListItem = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const UserName = styled.div`
  font-weight: 600;
`;

export const FollowButtonWrapper = styled.div`
  margin-left: auto;
`;