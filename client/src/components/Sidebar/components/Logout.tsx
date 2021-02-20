import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './../../ui/Button';
import { AuthContext } from '../../../shared/hooks/auth/useAuth';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)!;

  const handleOnLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <Button
      variant="primary"
      className="text-xl h-16 border-none rounded-2xl font-bold"
      onClick={() => handleOnLogout()}
      fullWidth
    >
      Logout
    </Button>
  );
};

export default Logout;
