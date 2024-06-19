// lib/graphql-service.ts
import { getClient } from '../lib/apollo-client';
import { GET_POST_TITLES_AND_DATES, GET_POST_BY_ID, GET_POST_IDS, SEARCH_POSTS } from './queries';

export interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
}

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
export const fetchPost = async (id: string): Promise<PostData> => {
  const { data } = await getClient().query({
    query: GET_POST_BY_ID,
    variables: { id },
  });

  return data.post;
};

/**
 * Fetches the IDs of all blog posts.
 */
export const fetchAllPostIds = async (): Promise<{ id: string }[]> => {
  const { data } = await getClient().query({
    query: GET_POST_IDS,
  });

  return data.posts.map((post: PostData) => ({ id: post.id }));
};

/**
 * Fetches the data for posts based on a search term.
 */
export const searchPosts = async (search: string): Promise<PostData[]> => {
  const { data } = await getClient().query({
    query: SEARCH_POSTS,
    variables: { query: search },
  });
  return data.posts;
};
