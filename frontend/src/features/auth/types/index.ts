export interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface LoginFormProps {
  onLoginSuccess: (accessToken: string, refreshToken: string) => void;
}