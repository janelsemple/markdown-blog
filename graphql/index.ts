

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import { indexPosts } from './util/posts.js';

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

// index posts for elastic search
indexPosts().catch(console.error);

// Start the server
console.log(`🚀 Server ready at ${url}`)