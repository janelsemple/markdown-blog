'use client';

import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import { SEARCH_POSTS, GET_POST_TITLES_AND_DATES } from '../lib/queries';
import { apolloClient } from '../lib/client-apollo-client';

// Fetch posts based on search query
const searchPosts = async (search: string): Promise<PostData[]> => {
  const { data } = await apolloClient.query({
    query: SEARCH_POSTS,
    variables: { query: search },
  });
  return data.posts;
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
    searchPosts(search)
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching search results');
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <PostList posts={posts} highlighted={highlighted} />
      ) : (
        <p className="text-center">No results found.</p>
      )}
      <div className="mt-8">
      </div>
    </div>
  );
};

export default Home;
