import React, { ReactElement, useContext } from 'react';
import { Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../shared/hooks/useAuth';

type Props = {
  element: ReactElement;
  path: string;
};

const ProtectedRoute = ({ element, path = '' }: Props) => {
  const location = useLocation();
  const { user } = useContext(AuthContext)!;

  if (!user) {
    <Navigate to={path} state={{ from: location.pathname }} />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
