import { Client } from '@elastic/elasticsearch';

/**
 * Elasticsearch client
 */
export const client = new Client({
  node: 'http://localhost:9200', // This is the address of the Elasticsearch container
});

/**
 * Function to create the index with mappings
 */
export async function createIndex() {
  const indexName = 'posts';

  // Check if the index already exists
  const indexExists = await client.indices.exists({ index: indexName });
  
  if (indexExists) {
    console.log(`Index "${indexName}" already exists`);
  } else {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            date: { type: 'date' },
            content: { type: 'text' },
            images: {
              type: 'nested',
              properties: {
                alt: { type: 'text' },
                url: { type: 'keyword' },
                postId: { type: 'keyword' }
              }
            }
          }
        }
      }
    });
    console.log(`Index "${indexName}" created with mappings`);
  }
}

export async function deleteIndex() {
  const indexName = 'posts';
  await client.indices.delete({ index: indexName });
  console.log(`Index "${indexName}" deleted`);
}
