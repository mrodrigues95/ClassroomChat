import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './../ui/Button';
import { AuthContext } from '../../shared/hooks/useAuth';

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
      className="text-xl"
      onClick={() => handleOnLogout()}
    >
      Logout
    </Button>
  );
};

export default Logout;
