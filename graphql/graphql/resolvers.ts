import { PostData, getSortedPostsData } from '../util/posts.js';
import client from '../util/elastisearch.js'; 
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

export const resolvers = {
  Query: {
    posts: async (): Promise<PostData[]> => {
      return getSortedPostsData();
    },
    searchPosts: async (_: any, { search }: { search: string }) => {
      if (!search) {
        // If the search string is empty, return all posts
        const allPosts = getSortedPostsData();
        return {
          titleMatches: allPosts,
          contentMatches: []
        };
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

      const titleMatches: PostData[] = titleResult.hits.hits.map(hit => ({
        id: hit._id || '',
        title: hit._source?.title || '',
        date: hit._source?.date || '',
        content: hit._source?.content || '',
      }));

      const contentMatches: PostData[] = contentResult.hits.hits.map(hit => ({
        id: hit._id || '',
        title: hit._source?.title || '',
        date: hit._source?.date || '',
        content: hit._source?.content || '',
      }));

      return {
        titleMatches,
        contentMatches
      };
    },
    post: async (_: any, { id }: { id: string }): Promise<PostData | undefined> => {
      const post = getSortedPostsData().find((post) => post.id === id);
      return post;
    }
  }
};
