// lib/graphql-service.ts
import { getClient } from '../lib/apollo-client';
import { 
  GET_POST_TITLES_AND_DATES, 
  GET_POST_BY_ID, 
  GET_POST_IDS, 
  SEARCH_POSTS_BY_TITLE, 
  SEARCH_POSTS_BY_CONTENT, 
  SEARCH_IMAGES_BY_ALT 
} from './queries';

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
    fetchPolicy: "network-only", // Ensures the query fetches from the network
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
    fetchPolicy: "network-only", // Ensures the query fetches from the network
  });

  return data.post;
};

/**
 * Fetches the IDs of all blog posts.
 */
export const fetchAllPostIds = async (): Promise<{ id: string }[]> => {
  const { data } = await getClient().query({
    query: GET_POST_IDS,
    fetchPolicy: "network-only", // Ensures the query fetches from the network
  });
  return data.posts.map((post: PostData) => ({ id: post.id }));
};

/**
 * Sanitize input to prevent injection attacks.
 * 
 * @param input - The input string to sanitize.
 * @returns The sanitized input string.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9 ]/g, '');
};

/**
 * Fetch posts based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of PostData objects.
 */
export const searchPostsByTitle = async (search: string): Promise<PostData[]> => {
  console.log ('search' + search);
  const sanitizedSearch = sanitizeInput(search);
  const { data } = await getClient().query({
    query: SEARCH_POSTS_BY_TITLE,
    variables: { query: sanitizedSearch },
  });
  console.log ('datat' + data.searchPostsByTitle);
  return data.searchPostsByTitle;
};

/**
 * Fetch posts based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of PostData objects.
 */
export const searchPostsByContent = async (search: string): Promise<PostData[]> => {
  const sanitizedSearch = sanitizeInput(search);
  const { data } = await getClient().query({
    query: SEARCH_POSTS_BY_CONTENT,
    variables: { query: sanitizedSearch },
  });
  return data.searchPostsByContent;
};

/**
 * Fetch images based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of ImageSearchResult objects.
 */
export const searchImagesByAlt = async (search: string): Promise<ImageSearchResult[]> => {
  const sanitizedSearch = sanitizeInput(search);
  const { data } = await getClient().query({
    query: SEARCH_IMAGES_BY_ALT,
    variables: { query: sanitizedSearch },
  });
  return data.searchImagesByAltText;
};

