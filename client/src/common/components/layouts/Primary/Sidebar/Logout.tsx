import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../../ui';
import { AuthContext } from '../../../../../modules';

const Logout = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext)!;

  const handleOnLogout = async () => {
    await logout();
    router.push('/login');
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
