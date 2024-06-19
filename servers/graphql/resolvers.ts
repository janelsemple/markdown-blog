import { PostData, getSortedPostsData } from '../util/posts.js';
import client from '../util/elastisearch.js'; // Adjust the import path as necessary
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';

export const resolvers = {
  Query: {
    posts: async (_: any, { search }: { search?: string }): Promise<PostData[]> => {
      console.log('search', search);
      if (search) {
        const result: SearchResponse<PostData> = await client.search({
          index: 'posts', // Replace with your index name
          body: {
            query: {
              multi_match: {
                query: search,
                fields: ['title', 'content'],
              },
            },
          },
        });

        return result.hits.hits.map(hit => ({
          id: hit._id || '', // Ensure id is never undefined
          title: hit._source?.title || '',
          date: hit._source?.date || '',
          content: hit._source?.content || '',
        }));
      } else {
        return getSortedPostsData();
      }
    },
    post: async (_: any, { id }: { id: string }): Promise<PostData | undefined> => {
      return getSortedPostsData().find((post) => post.id === id);
    }
  }
};