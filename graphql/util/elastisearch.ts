import { Client } from '@elastic/elasticsearch';

/**
 * elasticsearch client
 */
const client = new Client({
  node: 'http://localhost:9200', // This is the address of the Elasticsearch container
});

export default client;
