// react
import { ReactElement } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

// contexts

export const NonAuthRoute = (): ReactElement => {
  // hooks
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to={{ pathname: '/posts' }} state={{ from: location }} />
  ) : (
    <Outlet />
  );
};
