// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4000/api/graphql', // Point to the proxy API endpoint
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();
