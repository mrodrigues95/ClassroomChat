import React, { ReactElement, useContext } from 'react';
import { Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../shared/hooks/useAuth';

type Props = {
  path: string;
  element: ReactElement;
  unprotected?: boolean;
};

function RouteElement({
  element,
  unprotected,
}: {
  element: ReactElement;
  unprotected?: boolean;
}) {
  const location = useLocation();
  const { user } = useContext(AuthContext)!;

  if (user && unprotected) {
    return <Navigate to="/home" />;
  }

  if (!user && !unprotected) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  return element ?? null;
}

const ProtectedRoute = ({ path, element, unprotected }: Props) => {
  return (
    <Route
      path={path}
      element={<RouteElement element={element} unprotected={unprotected} />}
    />
  );
};

export default ProtectedRoute;
