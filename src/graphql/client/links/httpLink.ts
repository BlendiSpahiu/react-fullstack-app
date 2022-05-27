// apollo
import { createHttpLink } from '@apollo/client';

// export link
export const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'supersecretpassword',
  },
});
