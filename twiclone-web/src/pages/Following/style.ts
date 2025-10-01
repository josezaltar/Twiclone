// src/pages/Following/style.ts
import styled from 'styled-components';

export const Main = styled.main`
  padding: 16px;
  max-width: 960px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
`;

export const Loading = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const UserCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const AvatarWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.card};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

export const UserInfo = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 8px;
`;

export const Name = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 4px;
`;

export const Handle = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Bio = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 8px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const FollowBtn = styled.button<{ $following: boolean }>`
  width: 100%;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $following, theme }) =>
    $following ? 'transparent' : theme.colors.primary};
  color: ${({ $following, theme }) =>
    $following ? theme.colors.text : theme.colors.primaryText};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $following, theme }) =>
      $following ? theme.colors.hover : theme.colors.primary};
    opacity: ${({ $following }) => ($following ? 1 : 0.9)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;