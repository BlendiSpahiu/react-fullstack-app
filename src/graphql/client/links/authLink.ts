// apollo
import { setContext } from '@apollo/client/link/context';
import {
  getHasuraUserId,
  getHasuraUserRole,
  readAuthToken,
  validateAuthToken,
} from '../../../utils/auth/index';

// utils

export const authLink = setContext((_, { headers }) => {
  // fetch token from storage here
  const token = readAuthToken();

  // validate token here
  if (token && validateAuthToken(token)) {
    return {
      headers: {
        ...headers,
        'x-hasura-role': getHasuraUserRole(token),
        'x-hasura-user-id': getHasuraUserId(token),
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return headers;
});
