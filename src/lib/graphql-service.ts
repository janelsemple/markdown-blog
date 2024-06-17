import { getClient } from '../lib/apollo-client';
import { GET_POST_TITLES_AND_DATES, GET_POST_BY_ID, GET_POST_IDS } from '../lib/queries';

/**
 * Fetches the data for all blog posts.
 */
export const fetchAllPostInfo = async (): Promise<PostData[]> => {
    const { data } = await getClient().query({
      query: GET_POST_TITLES_AND_DATES,
    });
    return data.posts;
  };

/**
 * Fetches the data for a single blog post.
 */
export const fetchPost = async (id: string): Promise<Post> => {
    const { data } = await getClient().query({
      query: GET_POST_BY_ID,
      variables: { id },
    });
  
    return data.post;
  }
  
  /**
   * Fetches the IDs of all blog posts.
   */
  export const fetchAllPostIds = async(): Promise<PostData[]> => {
    const { data } = await getClient().query({
      query: GET_POST_IDS,
    });
  
    return data.posts;
  }