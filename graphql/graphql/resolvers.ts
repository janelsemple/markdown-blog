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
    }
  }
};
