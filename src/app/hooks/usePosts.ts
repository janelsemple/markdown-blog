'use client';

import { useState, useEffect, useCallback } from 'react';
import { SEARCH_POSTS_BY_TITLE, SEARCH_POSTS_BY_CONTENT, GET_POST_TITLES_AND_DATES } from '../../lib/queries';
import { apolloClient } from '../../lib/client-apollo-client';

interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
}

/**
 * Fetch posts based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of PostData objects.
 */
const searchPostsByTitle = async (search: string): Promise<PostData[]> => {
  try {
    const sanitizedSearch = sanitizeInput(search);
    const { data } = await apolloClient.query({
      query: SEARCH_POSTS_BY_TITLE,
      variables: { query: sanitizedSearch },
    });
    return data.searchPostsByTitle;
  } catch (error) {
    console.error('Error fetching search results by title:', error);
    throw new Error('Error fetching search results by title');
  }
};

/**
 * Fetch posts based on search query.
 * 
 * @param search - The search query string.
 * @returns A promise that resolves to an array of PostData objects.
 */
const searchPostsByContent = async (search: string): Promise<PostData[]> => {
  try {
    const sanitizedSearch = sanitizeInput(search);
    const { data } = await apolloClient.query({
      query: SEARCH_POSTS_BY_CONTENT,
      variables: { query: sanitizedSearch },
    });
    return data.searchPostsByContent;
  } catch (error) {
    console.error('Error fetching search results by content:', error);
    throw new Error('Error fetching search results by content');
  }
};

/**
 * Fetch initial post titles and dates.
 * 
 * @returns A promise that resolves to an array of PostData objects.
 */
const fetchInitialPosts = async (): Promise<PostData[]> => {
  try {
    const { data } = await apolloClient.query({
      query: GET_POST_TITLES_AND_DATES,
    });
    return data.posts;
  } catch (error) {
    console.error('Error fetching initial posts:', error);
    throw new Error('Error fetching initial posts');
  }
};

/**
 * Sanitize input to prevent injection attacks.
 * 
 * @param input - The input string to sanitize.
 * @returns The sanitized input string.
 */
const sanitizeInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9 ]/g, '');
};

/**
 * Custom hook to manage post data and handle search functionality.
 * 
 * @returns An object containing posts, titleMatches, contentMatches, loading state, error message, highlighted search term, and handleSearch function.
 */
const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [titleMatches, setTitleMatches] = useState<PostData[]>([]);
  const [contentMatches, setContentMatches] = useState<PostData[]>([]);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<string>('');

  /**
   * Fetch initial posts on component mount.
   */
  useEffect(() => {
    setLoadingTitle(true);
    fetchInitialPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoadingTitle(false);
      })
      .catch((error) => {
        setError('Error fetching initial posts');
        console.error('Error fetching initial posts:', error);
        setLoadingTitle(false);
      });
  }, []);

  /**
   * Handle search functionality.
   * 
   * @param search - The search query string.
   * @param searchByTitle - Boolean indicating whether to search by title.
   * @param searchByContent - Boolean indicating whether to search by content.
   */
  const handleSearch = useCallback((search: string, searchByTitle: boolean, searchByContent: boolean) => {
    setError(null);
    setHighlighted(search);

    if (search === '') {
      // If search is blank, fetch all posts
      fetchInitialPosts()
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
          setTitleMatches([]);
          setContentMatches([]);
        })
        .catch((error) => {
          setError('Error fetching initial posts');
          console.error('Error fetching initial posts:', error);
        });
    } else {
      if (searchByTitle) {
        setLoadingTitle(true);
        searchPostsByTitle(search)
          .then((titleResults) => {
            setTitleMatches(titleResults);
            if (!searchByContent) setContentMatches([]);
            setLoadingTitle(false);
          })
          .catch((error) => {
            setError('Error fetching search results by title');
            console.error('Error fetching search results by title:', error);
            setLoadingTitle(false);
          });
      } else {
        setTitleMatches([]);
      }

      if (searchByContent) {
        setLoadingContent(true);
        searchPostsByContent(search)
          .then((contentResults) => {
            setContentMatches(contentResults);
            if (!searchByTitle) setTitleMatches([]);
            setLoadingContent(false);
          })
          .catch((error) => {
            setError('Error fetching search results by content');
            console.error('Error fetching search results by content:', error);
            setLoadingContent(false);
          });
      } else {
        setContentMatches([]);
      }
    }
  }, []);

  return {
    posts,
    titleMatches,
    contentMatches,
    loadingTitle,
    loadingContent,
    error,
    highlighted,
    handleSearch,
  };
};

export default usePosts;
