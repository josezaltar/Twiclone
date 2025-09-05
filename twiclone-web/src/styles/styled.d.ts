// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'light' | 'dark';
    colors: {
      bg: string;
      text: string;
      muted: string;
      border: string;
      card: string;
      input: string;
      hover: string;
      primary: string;
      primaryText: string;
    };
    shadows: {
      sm: string;
      md: string;
    };
    radius: {
      sm: string;
      md: string;
      pill: string;
    };
  }
}
