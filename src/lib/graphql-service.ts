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

export interface ImageSearchResult {
  url: string;
  postId: string;
  alt: string;
}

/**
 * Fetches the data for all blog posts.
 */
export const fetchAllPostInfo = async (): Promise<PostData[]> => {
  try {
    const { data } = await getClient().query({
      query: GET_POST_TITLES_AND_DATES,
      fetchPolicy: "network-only", // Ensures the query fetches from the network
    });
    return data.posts;
  } catch (error) {
    console.error('Error fetching all post info:', error);
    throw new Error('Failed to fetch all post info.');
  }
};

/**
 * Fetches the data for a single blog post.
 */
export const fetchPost = async (id: string): Promise<PostData> => {
  try {
    const { data } = await getClient().query({
      query: GET_POST_BY_ID,
      variables: { id },
      fetchPolicy: "network-only", // Ensures the query fetches from the network
    });

    return data.post;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw new Error(`Failed to fetch post with id ${id}.`);
  }
};

/**
 * Fetches the IDs of all blog posts.
 */
export const fetchAllPostIds = async (): Promise<{ id: string }[]> => {
  try {
    const { data } = await getClient().query({
      query: GET_POST_IDS,
      fetchPolicy: "network-only", // Ensures the query fetches from the network
    });
    return data.posts.map((post: PostData) => ({ id: post.id }));
  } catch (error) {
    console.error('Error fetching all post IDs:', error);
    throw new Error('Failed to fetch all post IDs.');
  }
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
  const sanitizedSearch = sanitizeInput(search);
  try {
    const { data } = await getClient().query({
      query: SEARCH_POSTS_BY_TITLE,
      variables: { query: sanitizedSearch },
    });
    return data.searchPostsByTitle;
  } catch (error) {
    console.error(`Error searching posts by title with query "${sanitizedSearch}":`, error);
    throw new Error('Failed to search posts by title.');
  }
};

/**
 * Fetch posts based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of PostData objects.
 */
export const searchPostsByContent = async (search: string): Promise<PostData[]> => {
  const sanitizedSearch = sanitizeInput(search);
  try {
    const { data } = await getClient().query({
      query: SEARCH_POSTS_BY_CONTENT,
      variables: { query: sanitizedSearch },
    });
    return data.searchPostsByContent;
  } catch (error) {
    console.error(`Error searching posts by content with query "${sanitizedSearch}":`, error);
    throw new Error('Failed to search posts by content.');
  }
};

/**
 * Fetch images based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of ImageSearchResult objects.
 */
export const searchImagesByAlt = async (search: string): Promise<ImageSearchResult[]> => {
  const sanitizedSearch = sanitizeInput(search);
  try {
    const { data } = await getClient().query({
      query: SEARCH_IMAGES_BY_ALT,
      variables: { query: sanitizedSearch },
    });
    return data.searchImagesByAltText;
  } catch (error) {
    console.error(`Error searching images by alt text with query "${sanitizedSearch}":`, error);
    throw new Error('Failed to search images by alt text.');
  }
};
