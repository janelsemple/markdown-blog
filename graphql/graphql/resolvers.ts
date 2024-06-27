import { PostData, getSortedPostsData } from '../util/posts.js';
import client from '../util/elastisearch.js';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

export const resolvers = {
  Query: {
    /**
     * Fetches all sorted posts.
     *
     * @returns {Promise<PostData[]>} A promise that resolves to an array of PostData objects.
     */
    posts: async (): Promise<PostData[]> => {
      return getSortedPostsData();
    },

    /**
     * Searches for posts that contain the search string in the title.
     *
     * @param {any} _ - The parent resolver, not used here.
     * @param {Object} args - The arguments passed to the resolver.
     * @param {string} args.search - The search query string.
     * @returns {Promise<PostData[]>} A promise that resolves to an array of PostData objects that match the search criteria.
     */
    searchPostsByTitle: async (_: any, { search }: { search: string }) => {
      if (!search) {
        // If the search string is empty, return all posts
        const allPosts = getSortedPostsData();
        return allPosts;
      }

      // Search for posts that contain the search string in the title
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

      const titleMatches: PostData[] = titleResult.hits.hits.map(hit => ({
        id: hit._id || '',
        title: hit._source?.title || '',
        date: hit._source?.date || '',
        content: hit._source?.content || '',
      }));

      return titleMatches;
    },

    /**
     * Searches for posts that contain the search string in the content.
     *
     * @param {any} _ - The parent resolver, not used here.
     * @param {Object} args - The arguments passed to the resolver.
     * @param {string} args.search - The search query string.
     * @returns {Promise<PostData[]>} A promise that resolves to an array of PostData objects that match the search criteria.
     */
    searchPostsByContent: async (_: any, { search }: { search: string }) => {
      if (!search) {
        // If the search string is empty, return no posts
        return [];
      }

      // Search for posts that contain the search string in the content
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

      const contentMatches: PostData[] = contentResult.hits.hits.map(hit => ({
        id: hit._id || '',
        title: hit._source?.title || '',
        date: hit._source?.date || '',
        content: hit._source?.content || '',
      }));

      return contentMatches;
    },

    /**
     * Fetches a single post by its ID.
     *
     * @param {any} _ - The parent resolver, not used here.
     * @param {Object} args - The arguments passed to the resolver.
     * @param {string} args.id - The ID of the post to fetch.
     * @returns {Promise<PostData | undefined>} A promise that resolves to a PostData object or undefined if the post is not found.
     */
    post: async (_: any, { id }: { id: string }): Promise<PostData | undefined> => {
      const post = getSortedPostsData().find((post) => post.id === id);
      return post;
    },

    /**
     * Searches for images by alt text.
     *
     * @param {any} _ - The parent resolver, not used here.
     * @param {Object} args - The arguments passed to the resolver.
     * @param {string} args.altText - The alt text to search for.
     * @returns {Promise<Array<{ url: string, postId: string, alt: string }>>} A promise that resolves to an array of image URLs, their associated post IDs, and alt text.
     */
    searchImagesByAltText: async (_: any, { altText }: { altText: string }): Promise<{ url: string; postId: string; alt: string }[]> => {
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
                size: 100 // Adjust based on the expected number of inner hits
              }
            }
          },
          _source: ['images.url', 'images.postId', 'images.alt'],
          size: 100 // Adjust based on the expected number of top-level documents
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
    }
  }
};
