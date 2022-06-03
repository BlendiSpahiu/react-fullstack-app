import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { client } from '../graphql/client';
import { wsClient } from '../graphql/client/links/wsLink';
import { useGetAuthUserLazyQuery } from '../graphql/gen/graphql';
import {
  AuthContextProps,
  AuthUser,
} from '../interfaces/AuthContextProps.types';
import { Nullable } from '../interfaces/Nullable.types';
import {
  readAuthToken,
  removeAuthToken,
  validateAuthToken,
  writeAuthToken,
} from '../utils/auth';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  isAuthenticated: false,
  logout: () => null,
  login: (_token: string) => null,
  setUser: (_user: AuthUser) => null,
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  // local state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!readAuthToken()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Nullable<AuthUser>>(null);

  // hooks
  const initialTokenCheckRef = useRef(true);

  const login = (token: string) => {
    setLoading(true);
    writeAuthToken(token);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    removeAuthToken();
    setLoading(false);
    setIsAuthenticated(false);
    setUser(null);
    client.clearStore();
  }, []);

  // graphql lazy query
  const [getAuthUser, { loading: authLoading }] = useGetAuthUserLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: 'cache-first',
    onCompleted: (res) => {
      if (res?.authUser) {
        setLoading(false);
        setUser({ ...res.authUser?.[0] });
      } else {
        logout();
      }
    },
    onError: () => logout(),
  });

  useLayoutEffect(() => {
    const isTokenValid = validateAuthToken(readAuthToken() || '');

    if (initialTokenCheckRef.current) setIsAuthenticated(isTokenValid);
    initialTokenCheckRef.current = false;
    if (!isTokenValid) logout();
  }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) {
      client.clearStore();
      wsClient.close();
    }
    if (isAuthenticated) getAuthUser();
  }, [getAuthUser, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading: loading || authLoading,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
