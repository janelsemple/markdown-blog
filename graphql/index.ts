import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import { indexPosts } from './util/posts.js';

async function startServer() {
  try {
    // Server setup
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    try {
      // Index posts for Elasticsearch
      await indexPosts();
    } catch (err) {
      console.error('Error indexing posts for Elasticsearch:', err);
      throw new Error('Failed to index posts for Elasticsearch.');
    }

    // Start the server
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1); // Exit the process with an error code
  }
}

startServer();
