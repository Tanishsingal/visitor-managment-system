// src/components/auth/LogoutButton.tsx
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-sm"
    >
      Sign out
    </Button>
  );
};