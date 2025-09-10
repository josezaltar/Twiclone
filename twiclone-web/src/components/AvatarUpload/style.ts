// src/components/AvatarUpload/style.ts
import styled from 'styled-components';

export const Container = styled.div`
  /* Estilos para o container principal, como largura, altura, etc. */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  /* Estilos para o input de arquivo.
     Você pode ocultá-lo e criar um botão customizado,
     já que o input "file" é difícil de estilizar diretamente. */
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
`;