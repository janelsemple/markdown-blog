// lib/elasticsearch.js
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200', // This is the address of the Elasticsearch container
});

export default client;
