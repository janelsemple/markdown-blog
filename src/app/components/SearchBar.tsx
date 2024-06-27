'use client';
import React, { useState, useEffect } from 'react';

let timeoutId: NodeJS.Timeout;

const debounce = (func: (...args: any[]) => void, delay: number) => {
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface SearchBarProps {
  query: string;
  filter?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, filter = 'title' }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentFilter, setCurrentFilter] = useState(filter);

  useEffect(() => {
    setSearchQuery(query);
    setCurrentFilter(filter);
  }, [query, filter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedPerformSearch(event.target.value, currentFilter);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilter(event.target.value);
    debouncedPerformSearch(searchQuery, event.target.value);
  };

  const performSearch = (search: string, filter: string) => {
    if (search.trim() === '') {
      window.location.href = '/';
    } else {
      window.location.href = `/search?search=${search}&filter=${filter}`;
    }
  };

  const debouncedPerformSearch = debounce(performSearch, 600);

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search blog posts..."
        className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={currentFilter}
        onChange={handleFilterChange}
        className="ml-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="images">Images</option>
      </select>
    </div>
  );
};

export default SearchBar;
