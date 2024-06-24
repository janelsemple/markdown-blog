'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import FilterDropdown from './components/FilterDropdown';
import usePosts from './hooks/usePosts';

const Home = () => {
  const { 
    posts, 
    titleMatches, 
    contentMatches, 
    loadingTitle, 
    loadingContent, 
    error, 
    highlighted, 
    handleSearch 
  } = usePosts();

  const [filter, setFilter] = useState('both');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  useEffect(() => {
    // Trigger search again if there is a search result already displayed
    if (highlighted !== '') {
      handleSearch(highlighted, filter === 'title' || filter === 'both', filter === 'content' || filter === 'both');
    }
  }, [filter, highlighted, handleSearch]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={(search) => handleSearch(search, filter === 'title' || filter === 'both', filter === 'content' || filter === 'both')} />
        <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
      </div>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {highlighted === '' ? (
            <PostList posts={posts} highlighted={highlighted} />
          ) : (!titleMatches.length && !contentMatches.length) ? (
            <p className="text-center">No matches found.</p>
          ) : (
            <>
              {titleMatches.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Matches found in title</h2>
                  {loadingTitle ? (
                    <p className="text-center">Loading title matches...</p>
                  ) : (
                    <PostList posts={titleMatches} highlighted={highlighted} />
                  )}
                </>
              )}
              {contentMatches.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4 mt-8">Matches found in content</h2>
                  {loadingContent ? (
                    <p className="text-center">Loading content matches...</p>
                  ) : (
                    <PostList posts={contentMatches} highlighted={highlighted} />
                  )}
                </>
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
