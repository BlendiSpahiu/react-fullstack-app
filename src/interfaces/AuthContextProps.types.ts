import { UserFieldsFragment } from '../graphql/gen/graphql';
import { Nullable } from './Nullable.types';

export type AuthUser = Pick<
  UserFieldsFragment,
  'id' | 'email' | 'name' | 'role' | 'profilePicture' | 'createdAt'
>;

export interface AuthContextProps {
  loading: boolean;
  isAuthenticated: boolean;
  user: Nullable<AuthUser>;
  logout: () => void;
  login: (token: string) => void;
  setUser: (user: AuthUser) => void;
}
