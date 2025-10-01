import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 1000;
  overflow-y: auto;
`;

export const Modal = styled.div`
  background: #111;
  color: #fff;
  width: 600px;
  max-width: 100%;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  max-height: 90vh;
  overflow-y: auto;
`;

export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
`;

export const BannerSection = styled.div`
  margin-bottom: 60px;
`;

export const BannerPreview = styled.div<{ $src?: string }>`
  height: 150px;
  background: ${({ $src }) => ($src ? `url("${$src}")` : '#1e293b')};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -40px 0 20px 20px;
`;

export const AvatarPreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #111;
  object-fit: cover;
`;

export const UploadBtn = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #2a2a2a;
  background: #111;
  color: #ddd;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1a1a1a;
  }
`;

export const HiddenFile = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 14px;
    color: #ddd;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #1a1a1a;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #3a8bfd;
    box-shadow: 0 0 0 3px rgba(58, 139, 253, 0.25);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #1a1a1a;
  color: #fff;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #3a8bfd;
    box-shadow: 0 0 0 3px rgba(58, 139, 253, 0.25);
  }
`;

export const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background: #1d9bf0;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: transparent;
  color: #ddd;
  border: 1px solid #2a2a2a;
`;