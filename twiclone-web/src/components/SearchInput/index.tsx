// src/components/SearchInput/index.tsx
import { useEffect, useRef } from 'react';
import { useUIStore } from '../../store/ui';
import { Box, Icon, Input } from './style';

type Props = {
  placeholder?: string;
  autoFocus?: boolean;
};

export default function SearchInput({ placeholder = 'Buscar', autoFocus }: Props) {
  const q = useUIStore(s => s.search);
  const setSearch = useUIStore(s => s.setSearch);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <Box>
      <Icon>🔎</Icon>
      <Input
        ref={ref}
        value={q}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
      />
    </Box>
  );
}
