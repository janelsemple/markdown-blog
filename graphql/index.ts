import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import { indexPosts } from './util/posts.js';
import { createIndex, deleteIndex } from './util/elasticsearch.js';

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
      await deleteIndex();
      await createIndex();
    } catch (err) {
      console.error('Error setting up Elasticsearch indices:', err);
      throw new Error('Failed to setup Elasticsearch indices.');
    }

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
