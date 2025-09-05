// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Status from './pages/Status';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      {/* Rotas com Sidebar/Layout */}
      <Route element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path="followers" element={<Followers />} />
        <Route path="following" element={<Following />} />
        <Route path=":handle" element={<Profile />} />
        {/* Suporta as duas variações de rota de status */}
        <Route path="status/:id" element={<Status />} />
        <Route path=":handle/status/:id" element={<Status />} />
      </Route>

      {/* Login fora do Layout */}
      <Route path="/login" element={<Login />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
