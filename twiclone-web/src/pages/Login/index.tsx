// src/pages/Login/index.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Card, Title, Field, Input, Button, ErrorMsg, Wrap } from './style';

export default function Login() {
  const nav = useNavigate();
  const user = useAuthStore(s => s.user);
  const login = useAuthStore(s => s.login);
  const register = useAuthStore(s => s.register);

  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('');
  const [err, setErr] = useState<string | null>(null);

  // Se já logado, manda pro feed
  if (user) {
    nav('/');
    return null;
  }

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(handle.trim(), password);
      nav('/');
    } catch (e: any) {
      setErr(e?.message || 'Falha ao entrar.');
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await register(handle.trim(), display.trim(), password);
      nav('/');
    } catch (e: any) {
      setErr(e?.message || 'Falha ao registrar.');
    }
  };

  return (
    <Wrap>
      <Card as="form" onSubmit={onLogin}>
        <Title>Entrar</Title>
        <Field>
          <label>@handle</label>
          <Input
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder="@seuuser"
            required
          />
        </Field>
        <Field>
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Field>
        {err && <ErrorMsg>{err}</ErrorMsg>}
        <Button type="submit">Entrar</Button>
      </Card>

      <Card as="form" onSubmit={onRegister}>
        <Title>Criar conta</Title>
        <Field>
          <label>Nome exibido</label>
          <Input
            value={display}
            onChange={e => setDisplay(e.target.value)}
            placeholder="Seu nome"
            required
          />
        </Field>
        <Field>
          <label>@handle</label>
          <Input
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder="@seuuser"
            required
          />
        </Field>
        <Field>
          <label>Senha</label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Field>
        {err && <ErrorMsg>{err}</ErrorMsg>}
        <Button type="submit">Registrar</Button>
      </Card>
    </Wrap>
  );
}
