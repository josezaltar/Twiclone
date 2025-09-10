// src/pages/Login/index.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { Card, Title, Field, Input, Button, ErrorMsg, Wrap } from './style';

export default function Login() {
  const nav = useNavigate();

  const user = useAuth((s) => s.user);
  const login = useAuth((s) => s.login);
  const register = useAuth((s) => s.register);

  // estados de formulário
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('');
  const [err, setErr] = useState<string | null>(null);

  // loading separados para evitar duplo submit
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  // Redireciona quando já estiver logado (sem navegar durante o render)
  useEffect(() => {
    if (user) nav('/');
  }, [user, nav]);

  const normalizeHandle = (h: string) => h.trim().replace(/^@/, '');

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const h = normalizeHandle(handle);
    if (!h || !password) return;
    setLoadingLogin(true);
    try {
      await login(h, password);
      // o useEffect acima cuidará do redirect
    } catch (e: any) {
      setErr(e?.message || 'Falha ao entrar.');
    } finally {
      setLoadingLogin(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const h = normalizeHandle(handle);
    if (!h || !password || !display.trim()) return;
    setLoadingRegister(true);
    try {
      await register(h, display.trim(), password);
      // após registrar, a store já faz login; o useEffect redireciona
    } catch (e: any) {
      setErr(e?.message || 'Falha ao registrar.');
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <Wrap>
      <Card as="form" onSubmit={onLogin}>
        <Title>Entrar</Title>
        <Field>
          <label htmlFor="login-handle">@handle</label>
          <Input
            id="login-handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@seuuser"
            required
            autoComplete="username"
          />
        </Field>
        <Field>
          <label htmlFor="login-pass">Senha</label>
          <Input
            id="login-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Field>
        {err && <ErrorMsg aria-live="polite">{err}</ErrorMsg>}
        <Button type="submit" disabled={loadingLogin}>
          {loadingLogin ? 'Entrando…' : 'Entrar'}
        </Button>
      </Card>

      <Card as="form" onSubmit={onRegister}>
        <Title>Criar conta</Title>
        <Field>
          <label htmlFor="reg-display">Nome exibido</label>
          <Input
            id="reg-display"
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
            placeholder="Seu nome"
            required
          />
        </Field>
        <Field>
          <label htmlFor="reg-handle">@handle</label>
          <Input
            id="reg-handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@seuuser"
            required
            autoComplete="username"
          />
        </Field>
        <Field>
          <label htmlFor="reg-pass">Senha</label>
          <Input
            id="reg-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </Field>
        {err && <ErrorMsg aria-live="polite">{err}</ErrorMsg>}
        <Button type="submit" disabled={loadingRegister}>
          {loadingRegister ? 'Registrando…' : 'Registrar'}
        </Button>
      </Card>
    </Wrap>
  );
}
