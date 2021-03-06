import React, { useContext } from 'react';
import { AuthContext } from '../shared/hooks/auth/useAuth';
import Sidebar from './Sidebar/index';

const Layout = ({ children }: { children: any }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1">
        <>
          {auth?.hasUser && <Sidebar />}
          {children}
        </>
      </div>
    </div>
  );
};

export default Layout;
