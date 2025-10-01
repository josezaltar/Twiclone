import styled from 'styled-components';

export const Wrap = styled.div`
  /* container principal */
`;

export const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

export const Banner = styled.div<{ $src?: string }>`
  height: 200px;
  background: ${({ $src }) => ($src ? `url("${$src}")` : '#1e293b')};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const BannerActions = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const AvatarWrap = styled.label`
  position: relative;
  width: 120px;
  height: 120px;
  margin: -60px auto 0;
  display: block;
  cursor: pointer;
  border-radius: 50%;

  &::after {
    content: '📷';
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
    font-size: 32px;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const AvatarImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.bg};
  object-fit: cover;
  display: block;
`;

export const NameHandle = styled.div`
  text-align: center;
  margin-top: 12px;
  padding: 0 16px;

  strong {
    display: block;
    font-size: 20px;
    margin-bottom: 4px;
  }

  span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 15px;
  }
`;

export const Counters = styled.div`
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  padding: 0 16px;
`;

export const SmallBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

export const List = styled.div`
  /* lista de tweets */
`;

export const HiddenFile = styled.input.attrs({ type: 'file' })`
  display: none;
`;