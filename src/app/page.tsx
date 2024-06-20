'use client';

import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import { SEARCH_POSTS, GET_POST_TITLES_AND_DATES } from '../lib/queries';
import { apolloClient } from '../lib/client-apollo-client';

interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface PostSearchResult {
  titleMatches: PostData[];
  contentMatches: PostData[];
}

// Fetch posts based on search query
const searchPosts = async (search: string): Promise<PostSearchResult> => {
  const { data } = await apolloClient.query({
    query: SEARCH_POSTS,
    variables: { query: search },
  });
  return data.searchPosts;
};

// Fetch initial post titles and dates
const fetchInitialPosts = async (): Promise<PostData[]> => {
  const { data } = await apolloClient.query({
    query: GET_POST_TITLES_AND_DATES,
  });
  return data.posts;
};

const Home = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [titleMatches, setTitleMatches] = useState<PostData[]>([]);
  const [contentMatches, setContentMatches] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<string>('');

  // Fetch initial posts on component mount
  useEffect(() => {
    setLoading(true);
    fetchInitialPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching initial posts');
        console.error('Error fetching initial posts:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = useCallback((search: string) => {
    setLoading(true);
    setError(null);
    setHighlighted(search);
    if (search === '') {
      // If search is blank, fetch all posts
      fetchInitialPosts()
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
          setTitleMatches([]);
          setContentMatches([]);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching initial posts');
          console.error('Error fetching initial posts:', error);
          setLoading(false);
        });
    } else {
      searchPosts(search)
        .then((result) => {
          console.log('Search results:', result);
          setTitleMatches(result.titleMatches);
          setContentMatches(result.contentMatches);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching search results');
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {highlighted === '' ? (
            <PostList posts={posts} highlighted={highlighted} />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Matches found in title</h2>
              {titleMatches.length > 0 ? (
                <PostList posts={titleMatches} highlighted={highlighted} />
              ) : (
                <p className="text-center">No results found in title.</p>
              )}
              <h2 className="text-2xl font-bold mb-4 mt-8">Matches found in content</h2>
              {contentMatches.length > 0 ? (
                <PostList posts={contentMatches} highlighted={highlighted} />
              ) : (
                <p className="text-center">No results found in content.</p>
              )}
            </>
          )}
        </>
      )}
      <div className="mt-8"></div>
    </div>
  );
};

export default Home;
