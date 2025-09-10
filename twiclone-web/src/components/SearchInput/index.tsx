import { useEffect, useRef, KeyboardEvent } from 'react';
import { useUIStore } from '../../store/ui';
import { Box, Icon, Input, ClearBtn } from './style';

type Props = {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export default function SearchInput({
  placeholder = 'Buscar',
  autoFocus,
  className,
}: Props) {
  const q = useUIStore((s) => s.search);
  const setSearch = useUIStore((s) => s.setSearch);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      // timeout ajuda quando o input aparece após uma animação/modal
      const t = setTimeout(() => ref.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setSearch('');
      ref.current?.blur();
    }
  }

  return (
    <Box role="search" className={className}>
      <Icon aria-hidden>🔎</Icon>
      <Input
        ref={ref}
        type="search"
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        value={q}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {q && (
        <ClearBtn
          type="button"
          aria-label="Limpar busca"
          onClick={() => setSearch('')}
        >
          ×
        </ClearBtn>
      )}
    </Box>
  );
}
