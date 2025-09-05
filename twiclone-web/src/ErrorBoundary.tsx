import { Component, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: any): State {
    return { hasError: true, message: String(err?.message || err) };
  }

  componentDidCatch(err: any, info: any) {
    // Você pode enviar para um logger aqui
    // console.error('ErrorBoundary', err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: '#fff', background: '#111', fontFamily: 'sans-serif' }}>
          <h2>Ops, algo deu errado.</h2>
          <pre>{this.state.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
