// src/components/Sidebar/index.tsx
import { useAuth } from '../../store/auth';
import { useUIStore } from '../../store/ui';
import {
  Wrapper,
  Row,
  ThemeBtn,
  UserBox,
  Avatar,
  Info,
  Name,
  Handle,
} from './style';

export default function Sidebar() {
  const { user } = useAuth();
  const themeMode = useUIStore((s) => s.themeMode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  return (
    <Wrapper>
      <Row>
        <ThemeBtn type="button" onClick={toggleTheme}>
          {themeMode === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
        </ThemeBtn>
      </Row>

      {user && (
        <UserBox>
          <Avatar
            src={
              user.avatar_url ||
              `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
            }
            alt=""
          />
          <Info>
            <Name>{user.display_name || user.username}</Name>
            <Handle>@{user.username}</Handle>
          </Info>
        </UserBox>
      )}
    </Wrapper>
  );
}
