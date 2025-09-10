// src/components/TweetCard/style.ts
import styled from 'styled-components';

export const Article = styled.article`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const Author = styled.div`
  font-weight: 600;
`;

export const Text = styled.p`
  margin-top: 6px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  /* Estilos para os botões, se necessário. */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  color: #333;
`;