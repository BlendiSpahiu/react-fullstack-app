import { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const AuthRoute = (): ReactElement => {
  // hooks
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/auth/login' }} state={{ from: location }} />
  );
};
