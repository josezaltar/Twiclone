// src/hooks/useMinuteTick.ts
import { useEffect, useState } from 'react';

/** Re-renderiza o componente a cada minuto (p/ atualizar "há X min"). */
export function useMinuteTick() {
  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
}
