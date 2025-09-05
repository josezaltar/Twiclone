// src/components/FollowButton/index.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealAPI } from '../../lib/realApi';
import { useAuthStore } from '../../store/auth';
import { Btn } from './style';

type Props = {
  targetUserId?: number;
  targetHandle?: string;
  isFollowing: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export default function FollowButton({
  targetUserId,
  targetHandle,
  isFollowing,
  size = 'md',
  className,
}: Props) {
  const { user } = useAuthStore();
  const qc = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (targetUserId) return RealAPI.toggleFollow(targetUserId);
      if (targetHandle) return RealAPI.toggleFollowByHandle(targetHandle);
      throw new Error('Sem destino para seguir');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] });
      qc.invalidateQueries({ queryKey: ['followers'] });
      qc.invalidateQueries({ queryKey: ['following'] });
      qc.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  if (!user) return null;
  if (targetHandle && user.username === targetHandle) return null;

  return (
    <Btn
      type="button"
      className={className}
      onClick={() => mutate()}
      disabled={isPending}
      $size={size}
      $active={isFollowing}
    >
      {isFollowing ? 'Seguindo' : 'Seguir'}
    </Btn>
  );
}
