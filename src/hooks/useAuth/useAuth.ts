import { useContext } from 'react';
import { AuthContext } from '@contexts';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { logout, login, isAuthenticated, setUser, user, loading } =
    authContext;

  return {
    login,
    logout,
    loading,
    isAuthenticated,
    setUser,
    user,
  };
};
