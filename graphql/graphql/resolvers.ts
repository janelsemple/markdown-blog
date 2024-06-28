// resolvers.js
import { PostData, getSortedPostsData } from '../util/posts.js';
import { client, ensureIndex } from '../util/elasticsearch.js';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

export const resolvers = {
  Query: {
    posts: async (): Promise<PostData[]> => {
      try {
        return getSortedPostsData();
      } catch (error) {
        console.error('Error fetching sorted posts:', error);
        throw new Error('Failed to fetch sorted posts.');
      }
    },
    searchPostsByTitle: async (_: any, { search }: { search: string }) => {
      try {
        if (!search) {
          return getSortedPostsData();
        }

        const titleResult: SearchResponse<PostData> = await client.search({
          index: 'posts',
          body: {
            query: {
              bool: {
                should: [
                  { match: { title: search } },
                  { match_phrase: { title: search } },
                  { wildcard: { title: `*${search}*` } }
                ]
              }
            }
          }
        });

        return titleResult.hits.hits.map(hit => ({
          id: hit._id || '',
          title: hit._source?.title || '',
          date: hit._source?.date || '',
          content: hit._source?.content || '',
        }));
      } catch (error) {
        console.error('Error searching posts by title:', error);
        throw new Error('Failed to search posts by title.');
      }
    },
    searchPostsByContent: async (_: any, { search }: { search: string }) => {
      try {
        if (!search) {
          return [];
        }

        const contentResult: SearchResponse<PostData> = await client.search({
          index: 'posts',
          body: {
            query: {
              bool: {
                should: [
                  { match: { content: search } },
                  { match_phrase: { content: search } },
                  { wildcard: { content: `*${search}*` } }
                ]
              }
            }
          }
        });

        return contentResult.hits.hits.map(hit => ({
          id: hit._id || '',
          title: hit._source?.title || '',
          date: hit._source?.date || '',
          content: hit._source?.content || '',
        }));
      } catch (error) {
        console.error('Error searching posts by content:', error);
        throw new Error('Failed to search posts by content.');
      }
    },
    post: async (_: any, { id }: { id: string }): Promise<PostData | undefined> => {
      try {
        return getSortedPostsData().find(post => post.id === id);
      } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        throw new Error(`Failed to fetch post with id ${id}.`);
      }
    },
    searchImagesByAltText: async (_: any, { altText }: { altText: string }): Promise<{ url: string; postId: string; alt: string }[]> => {
      try {
        if (!altText) {
          return [];
        }

        const response = await client.search({
          index: 'posts',
          body: {
            query: {
              nested: {
                path: 'images',
                query: {
                  bool: {
                    should: [
                      { match: { 'images.alt': altText } },
                      { match_phrase: { 'images.alt': altText } },
                      { wildcard: { 'images.alt': `*${altText}*` } }
                    ]
                  }
                },
                inner_hits: {
                  size: 100 
                }
              }
            },
            _source: ['images.url', 'images.postId', 'images.alt'],
            size: 100 
          }
        });

        const hits = response.hits.hits;
        const images: { url: string; postId: string; alt: string }[] = [];

        hits.forEach((hit: any) => {
          hit.inner_hits.images.hits.hits.forEach((imageHit: any) => {
            images.push({
              url: imageHit._source.url,
              postId: imageHit._source.postId,
              alt: imageHit._source.alt
            });
          });
        });

        return images;
      } catch (error) {
        console.error('Error searching images by alt text:', error);
        throw new Error('Failed to search images by alt text.');
      }
    }
  },
  Mutation: {
    ensureIndex: async (): Promise<string> => {
      try {
        await ensureIndex();
        console.log('Elasticsearch index ensured successfully.');
        return 'Elasticsearch index ensured successfully.';
      } catch (error) {
        console.error('Error ensuring Elasticsearch index:', error);
        throw new Error('Failed to ensure Elasticsearch index.');
      }
    }
  }
};
