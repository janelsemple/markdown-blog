import { Client } from "@elastic/elasticsearch";

const INDEX_NAME = "posts";

const client = new Client({ node: "http://localhost:9200" });

/**
 * Ensures the existence of the Elasticsearch index
 * Creates the index if it doesn't exist, attempts recreation on failure
 */
async function ensureIndex() {
  if (!client) {
    console.warn("Elasticsearch client is not available in this environment");
    return;
  }
  try {
    const indexExists = await client.indices.exists({ index: INDEX_NAME });
    if (!indexExists) {
      await createIndex();
    }
  } catch (error) {
    console.error(`Index check failed: ${error}`);
    await recreateIndex();
  }
}

/**
 * Creates the Elasticsearch index with predefined mappings
 * @throws {Error} If index creation fails
 */
async function createIndex() {
  if (!client) return;
  try {
    await client.indices.create({
      index: INDEX_NAME,
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            date: { type: "date" },
            content: { type: "text" },
            images: {
              type: "nested",
              properties: {
                alt: { type: "text" },
                url: { type: "keyword" },
                postId: { type: "keyword" },
              },
            },
          },
        },
      },
    });
    console.log(`Index "${INDEX_NAME}" created successfully`);
  } catch (error) {
    throw new Error(`Failed to create index: ${error}`);
  }
}

/**
 * Attempts to recreate the index by deleting and recreating it
 * @throws {Error} If index recreation fails
 */
async function recreateIndex() {
  if (!client) return;
  try {
    await client.indices.delete({
      index: INDEX_NAME,
      ignore_unavailable: true,
    });
    await createIndex();
  } catch (error) {
    console.error(`Index recreation failed: ${error}`);
    throw new Error("Unable to recover index");
  }
}

// Export the client and ensureIndex function
export { client, ensureIndex };