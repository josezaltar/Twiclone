// src/components/BannerUpload/style.ts
import styled from 'styled-components';

export const Container = styled.div`
  /* Estilos para o container do seu banner, como tamanho e alinhamento */
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const StyledInput = styled.input`
  /* Estilos para o input de arquivo.
     Você pode ocultá-lo e criar um botão customizado para upload. */
  border: 1px dashed #ccc;
  padding: 16px;
  border-radius: 4px;
  text-align: center;
`;