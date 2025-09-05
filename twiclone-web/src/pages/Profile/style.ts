// src/pages/Profile/style.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const BannerWrap = styled.div`
  position: relative;
`;

export const BannerImg = styled.img`
  width: 100%;
  aspect-ratio: 3 / 1;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.input};
`;

export const BannerAction = styled.div`
  position: absolute;
  right: 16px;
  bottom: 12px;
`;

export const HeaderRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  padding: 0 16px;
  margin-top: -40px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.card};
  border: 4px solid
    ${({ theme }) => (theme.name === 'light' ? 'rgba(255,255,255,.85)' : 'rgba(0,0,0,.6)')};
`;

export const Content = styled.div`
  padding: 8px 16px;
`;

export const DisplayName = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Username = styled.div`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Bio = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.muted};

  b {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
`;

export const NotFound = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.colors.muted};
`;
