import { WebSocketLink } from '@apollo/link-ws';

export const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': 'supersecretpassword',
      },
    },
  },
});
