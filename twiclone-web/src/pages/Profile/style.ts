import styled from 'styled-components';

export const Wrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
`;

export const Banner = styled.div<{ $src?: string }>`
  width: 100%;
  aspect-ratio: 3 / 1;
  background: ${({ $src, theme }) =>
    $src
      ? `center/cover no-repeat url(${$src})`
      : `linear-gradient(135deg, ${theme.colors.border}, ${theme.colors.card})`};
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px;
`;

export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateY(-36px);
  padding: 0 12px;
`;

export const AvatarImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.card};
`;

export const NameHandle = styled.div`
  padding: 0 12px 8px 12px;
  display: grid;
  gap: 4px;

  strong { font-size: 20px; }
  span { color: ${({ theme }) => theme.colors.muted}; }
`;

export const Counters = styled.div`
  padding: 0 12px 12px 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

export const Actions = styled.div`
  padding: 0 12px 16px 12px;
`;

export const SmallBtn = styled.button`
  padding: 6px 10px;
  font-size: 13px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const List = styled.div`
  display: grid;
`;
