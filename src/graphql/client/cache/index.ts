import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Subscription: {
      fields: {
        posts: {
          merge: (_, incoming) => incoming,
        },
      },
    },
  },
});
