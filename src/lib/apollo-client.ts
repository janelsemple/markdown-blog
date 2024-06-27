import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";


/**
 * Registers an Apollo Client instance with the Apollo Client Provider.
 * THIS CLIENT IS ONLY FOR USE IN SERVER-SIDE RENDERING OR STATIC SITE GENERATION.
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:4000/api/graphql",
    }),
  });
});