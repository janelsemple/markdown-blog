import { PostData, getSortedPostsData } from '../util/posts.js';
import client from '../util/elastisearch.js'; 
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types.js';

export const resolvers = {
  Query: {
    posts: async (_: any, { search }: { search?: string }): Promise<PostData[]> => {
      console.log('search', search);
      if (search) {
        // Search for posts that contain the search string in the title or content
        const result: SearchResponse<PostData> = await client.search({
          index: 'posts', 
          body: {
            query: {
              bool: {
                should: [
                  {
                    match_phrase: {
                      title: search
                    }
                  },
                  {
                    match_phrase: {
                      content: search
                    }
                  }
                ]
              }
            },
          },
        });

        return result.hits.hits.map(hit => ({
          id: hit._id || '', 
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